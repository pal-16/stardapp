
import React, { useState } from 'react';
import { sendKlay } from '../utils/connectWallet';

const DonateModal = (props) => {
  const [amountInKlay, setAmountInKlay] = useState(0);
  const { onClose } = props;

  const handleOnClose = (e) => {
    if (e.target.id === 'donateModalContainer') {
      onClose()
    }
  }

  const handleAmountInKlayChange = event => {
    setAmountInKlay(event.target.value);
  };

  return (
    <div 
      id="donateModalContainer"
      onClick={handleOnClose}
      className="fixed rounded backdrop-blur mt-[8rem] inset-0 items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-[#251B37]">
        <div className="py-6 px-9">
          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#FFCACA]">
              Donate
            </label>
            <div className="mb-4 flex flex-col">
              <label htmlFor="amountInKlay" className="mb-2 font-semibold">Amount (in KLAY)</label>
              <div className="relative">
                <input
                  type="number"
                  id="amountInKlay"
                  className="w-full bg-[#251B37] rounded-lg border border-slate-200 px-2 py-1 pl-8 hover:border-blue-500 focus:outline-none focus:ring focus:ring-blue-500/40 active:ring active:ring-blue-500/40"
                  onChange={handleAmountInKlayChange}  
                />
              </div>
            </div>
            <div>
            <button
              className="navLink navLink-hover disabled:cursor-not-allowed"
              onClick={() => {sendKlay({amountInKlay})}}
            >
              Send KLAY
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonateModal;