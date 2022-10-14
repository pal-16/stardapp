import React, { useState } from 'react';
import { sendNft } from '../utils/connectWallet';

const SendNft = (props) => {
  const [address, setAddress] = useState(null);
  const { onClose, nftId, nftImage, nftTitle } = props;

  const handleOnClose = (e) => {
    if (e.target.id === 'SendNftContainer') {
      onClose()
    }
  }

  const handleAddressChange = event => {
    setAddress(event.target.value);
  };

  return (
    <div 
      id="SendNftContainer"
      onClick={handleOnClose}
      className="fixed rounded backdrop-blur mt-[8rem] inset-0 items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-[#251B37]">
        <div className="py-6 px-9">
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Gift NFT 
            </label>
            <div className="mb-4 flex flex-col">
              <label htmlFor="address" className="mb-2 font-semibold">Receiver's Address</label>
              <div className="relative">
                <input
                  id="address"
                  className="w-full bg-[#251B37] rounded-lg border border-slate-200 px-2 py-1 pl-8 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
                  onChange={handleAddressChange}  
                />
              </div>
            </div>
            <div>
            <button
              className="navLink navLink-hover disabled:cursor-not-allowed"
              onClick={() => {sendNft(address, nftId)}}
            >
              Gift NFT to {address}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SendNft;