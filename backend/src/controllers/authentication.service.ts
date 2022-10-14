import GetTokenRequest from '../interfaces/getTokenRequest';
import GetTokenResponse, {
  GetTokenResponseFailure,
  GetTokenResponseSuccess,
} from '../interfaces/getTokenResponse';
import JwtAccessTokenPayload from '../interfaces/jwtAccessTokenPayload';
import { ethers } from 'ethers';
import Web3 from 'web3';
import jwt from 'jsonwebtoken';
import axios, { ResponseType } from 'axios';

async function doesWalletOwnNft({walletPublicAddress}:{walletPublicAddress: string}): Promise<boolean> {
  const resp = await axios({
    method: 'get',
    url: `https://th-api.klaytnapi.com/v2/contract/nft/${process.env.NFT_CONTRACT_ADDRESS}/owner/${walletPublicAddress}`,
    headers: { 
      'Content-Type': 'application/json',
      'x-chain-id': '1001',
      'Authorization': `Basic ${process.env.KLAYTN_BASIC_AUTH_TOKEN}`
    },
  });
  const { items } = resp.data;
  return items && items?.length > 0;
}


async function didWalletCreateNft({walletPublicAddress}:{walletPublicAddress: string}): Promise<boolean> {
  return `${process.env.NFT_CONTRACT_CREATOR_ADDRESS}` === walletPublicAddress;
}

function createToken(secret: string, getTokenRequest: GetTokenRequest, accessLevel: 'read' | 'write'): string {
  const expiresIn = '1h';
  const { walletPublicAddress, nftContractAddress, nftId } = getTokenRequest;
  const jwtAccessTokenPayload: JwtAccessTokenPayload = {
    walletPublicAddress,
    nftContractAddress,
    nftId,
    accessLevel
  };
  return jwt.sign(jwtAccessTokenPayload, secret, { expiresIn });
}

export { GetTokenResponseSuccess, GetTokenResponseFailure, GetTokenResponse };
export { JwtAccessTokenPayload };
export default function AuthNft() {
  let _secret: string;
  let _web3: Web3;

  return {
    init: function ({
      secret,
    }: {
      secret: string;
    }) {
      _secret = secret;
    },
    getToken: async function (
      getTokenRequest: GetTokenRequest
    ): Promise<GetTokenResponse> {
      const {
        nonce,
        signature,
        walletPublicAddress,
        nftId,
      } = getTokenRequest;
      try {
        // Verify the signature.
        const signerAddr = ethers.utils.verifyMessage(nonce, signature);
        if (signerAddr !== walletPublicAddress) {
          return {
            data: {
              errorMessage: 'Invalid signature',
              errorCode: 'invalid_signature',
            },
            code: 400,
          };
        }
        // Check if the wallet created the NFT and give write access.
        if (await didWalletCreateNft({walletPublicAddress})) {
          const accessLevel = 'write';
          return {
            data: {
              accessToken: createToken(_secret, getTokenRequest, accessLevel),
              walletPublicAddress,
              accessLevel,
              nftId,
              iat: Date.now(),
              exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
            },
            code: 200,
          };
        }
        // Check if the wallet owns the NFT and give read-only access.
        if (await doesWalletOwnNft({walletPublicAddress})) {
          const accessLevel = 'read';
          return {
            data: {
              accessToken: createToken(_secret, getTokenRequest, accessLevel),
              walletPublicAddress,
              accessLevel,
              nftId,
              iat: Date.now(),
              exp: Date.now() + 1000 * 60 * 60 * 24 * 30,
            },
            code: 200,
          };
        }
        
        return {
          data: {
            errorMessage: 'Invalid NFT',
            errorCode: 'invalid_nft',
          },
          code: 400,
        };
      } catch (err) {
        console.log(err);
        return {
          data: {
            errorMessage: 'Unknown error',
            errorCode: 'unknown_error',
          },
          code: 500,
        };
      }
    },
    verifyToken: function (token: string): boolean {
      try {
        const {accessLevel} = jwt.verify(token, _secret) as JwtAccessTokenPayload;
        return true;
      } catch (err) {
        return false;
      }
    },
  };
}
