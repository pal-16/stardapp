import { ethers } from 'ethers';
import { NEXT_PUBLIC_MINTER_ADDRESS } from '../constants';
import Minter5 from '../artifacts/contracts/Minter5.sol/Minter5.json'
import axios from 'axios';

// Check for MetaMask wallet browser extension
export const hasEthereum = () => {
  return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
}

export const connectWallet = async () => {
  // e.preventDefault();
  try {
    const message = "message";
    console.log({ message });
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    try {
      console.log('account', account);
      const contract = new ethers.Contract(NEXT_PUBLIC_MINTER_ADDRESS, Minter5.abi, signer)
      console.log(contract);
      const balance = await contract.balanceOf(account);
      for(let i = 0; i < balance.toNumber(); i++) {
        const tokenId = (await contract.tokenOfOwnerByIndex(account, i)).toNumber();
        console.log(tokenId);
        const tokenUri = await contract.tokenURI(tokenId);
        const content = (await axios.get(tokenUri)).data;
        console.log(content);
        console.log('contract.address', contract.address);
        nfts.push({...content, nftId: tokenId, nftContractAddress: contract.address });
      }
    } catch(error) {
      console.error(error);
    }
  } catch(error) {
    console.error(error);
  }
  return nfts;
}

export const sendNft = async (account, nftId) => {
  if(!hasEthereum()) return;
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    try {
      console.log('account', account);
      const contract = new ethers.Contract(NEXT_PUBLIC_MINTER_ADDRESS, Minter5.abi, signer)
      console.log(contract);
      const transaction = await contract["safeTransferFrom(address,address,uint256)"](localStorage.getItem("address") /* from */, account /* to */, nftId);
      await transaction.wait()
    } catch(error) {
      console.error(error);
    }
  } catch(error) {
    console.error(error);
  }
}