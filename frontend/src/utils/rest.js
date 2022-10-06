import axios from "axios";
import { API_BASE_URL, NFT_CONTRACT_ADDRESS } from '../constants';

export const getAccessToken = async ({signature, walletPublicAddress}) => {
  try{
    const res = await axios.post(
      `${API_BASE_URL}/token`, 
      {
        nonce: 'message',
        signature,
        walletPublicAddress,
        nftContractAddress: NFT_CONTRACT_ADDRESS,
        nftId: '0',
      },
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return { accessToken: res.data.accessToken, error: null };
  } catch (error) {
    return { accessToken: null, error };
  }
};

export const removeAccessToken = async () => {
  const res = await axios.delete(
    `${API_BASE_URL}/token`, {
      withCredentials: true,
    }
  );
  console.log(res.data);
  return res.data;
}

export const getContent = async (filename) => {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/download`,
      {
        // "filename": "rick-roll-rick-ashley.gif"
        "filename": filename
      },
      {
        responseType: 'blob',
        withCredentials: true
      }
    );
    return {uri: URL.createObjectURL(res.data), error: null};
  } catch (err) {
    return {uri: null, error: err};
  }
}

export const listContents = async () => {
  const res = await axios.post(
    `${API_BASE_URL}/list`,
    {},
    {
      withCredentials: true
    }
  );
  return res.data;
}

export const getContractDetails = async () => {
  try{
    const res = await axios.get(
      `${API_BASE_URL}/contract/${NFT_CONTRACT_ADDRESS}`,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    return { data: res.data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
