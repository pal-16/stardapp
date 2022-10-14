import axios from 'axios';
import { ethers } from 'ethers';
import TaylorKlay from '../artifacts/contracts/TaylorKlay.sol/TaylorKlay.json';
import { NFT_CONTRACT_ADDRESS } from '../constants';
import {getNftsForAccountRest} from './rest';

// Check for MetaMask wallet browser extension
export const hasEthereum = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
}

export const connectWallet = async () => {
  // e.preventDefault();
  try {
    const message = "message";
    if (!window.ethereum)
      throw new Error('No crypto wallet found. Please install it.');
    await window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    return (err.message);
  }
}

export const disconnectWallet = async () => {
  document.cookie = 'Authorization=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const getNftsForAccount = async (account) => {
  const nfts = [];
  if(!hasEthereum()) return nfts;
  try {
    const { data, error} = await getNftsForAccountRest({account});
    return data;
  } catch(error) {
    console.error(error);
    alert(error.data?.message ?? 'Something went wrong!');
  }
  return nfts;
}

export const getNftMetadataForAccount = async (account) => {
  const nfts = [];
  if(!hasEthereum()) return nfts;
  try {
    const nftsList = await getNftsForAccount(account);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, TaylorKlay.abi, signer)
    const balance = await contract.balanceOf(account);
    for(let i = 0; i < nftsList.length; i++) {
      const tokenId = Number(nftsList[i].tokenId);
      const tokenUri = await contract.tokenIdToTokenUri(tokenId);
      const content = (await axios.get(tokenUri)).data;
      nfts.push({...content, nftId: tokenId, nftContractAddress: contract.address });
    }
  } catch(error) {
    console.error(error);
    alert(error.data?.message ?? 'Something went wrong!');
  }
  return nfts;
}

export const sendNft = async (account, nftId) => {
  if(!hasEthereum()) return;
  try {    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, TaylorKlay.abi, signer)
    const transaction = await contract.transferFrom(localStorage.getItem("address") /* from */, account /* to */, nftId);
    await transaction.wait()
  } catch(error) {
    console.error(error);
    alert(error.data?.message ?? 'Something went wrong!');
  }
}

export const getMonetizationInfo = async () => {
  const res = {mintRevenues:[], donationRevenues: []};
  if(!hasEthereum()) return res;
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    const address = await signer.getAddress()
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, TaylorKlay.abi, signer)
    const owners = new Set();
    // const tokenIdCounter = await contract.tokenIdCounter();
    // console.log('tokenIdCounter', tokenIdCounter);
    const tokenUri = await contract.tokenURI(0);
    console.log('tokenUri', String(tokenUri.toString()));
    const tokenIdToTokenUri = await contract.tokenIdToTokenUri(0);
    console.log('tokenIdToTokenUri', String(tokenIdToTokenUri.toString()));
    const balance = await contract.balanceOf("0x5d905Cd5734A457139bc04c77CAAf3DFCBf0bA33");
    console.log('balance', balance);
    const symbol = await contract.symbol();
    console.log('symbol', symbol);
    console.log(contract);
    const tokenIdCounter = await contract.tokenIdCounter();
    for (let i=0; i<tokenIdCounter; i++) {
      owners.add(await contract.ownerOf(i))
    }
    for (const owner of owners) {
      res.mintRevenues.push({address: owner, revenue: ethers.utils.formatEther(await contract.addressToAmountMint(owner))});
      res.donationRevenues.push({address: owner, revenue: ethers.utils.formatEther(await contract.addressToAmountDonate(owner))});
    }
  } catch(error) {
    console.error(error);
    alert(error.data?.message ?? 'Something went wrong!');
  }
  return res;
}

export const getContractBalance = async (nftContractAddress) => {
  if (!hasEthereum) return {data: null, error: 'No wallet found!'};
  try {
    const provider = ethers.getDefaultProvider();
    const balance = await provider.getBalance(nftContractAddress);
    return {data: balance.toNumber(), error: null};
  } catch(error) {
    console.error(error);
    return {data: null, error};
  }
}

export const sendKlay = async ({amountInKlay}) => {
  if(!hasEthereum()) return
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    const address = await signer.getAddress()
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, TaylorKlay.abi, signer)
    const transaction = await contract.donate( { value: ethers.utils.parseEther(amountInKlay) })

    await transaction.wait()
  } catch(error) {
    console.error(error);
    alert(error.data?.message ?? 'Something went wrong!');
  }
}