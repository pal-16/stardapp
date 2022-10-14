import { useEffect, useState } from "react";
import { getMonetizationInfo } from "../utils/connectWallet";

const MonetizationView = (props) => {
  const [monetization, setMonetization] = useState({});
  
  useEffect(() => {
    (getMonetizationInfo()).then(resp => {
      setMonetization(resp);
    });
  }, []);
  
  return (
    <div className="overflow-x-auto text-[#FFCACA]">
      <div className="min-w-screen min-h-screen bg-[#372948] flex items-start justify-center  font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <div className="flex flex-row px-[1rem] py-[1rem] text-2xl bg-[#372948]">
              <span className="flex flex-row font-medium">
                Total Donation Revenue: KLAY {monetization?.donationRevenues && monetization.donationRevenues.length > 0 ? `${monetization.donationRevenues.reduce((sum, current) => sum + (+ current.revenue), 0)}` : '0'}
              </span>
            </div>
            <div className="flex flex-row px-[1rem] pb-[1rem] text-2xl bg-[#372948]">
              <span className="flex flex-row font-medium">
                Total Minting Revenue: KLAY {monetization?.mintRevenues && monetization.mintRevenues.length > 0 ? `${monetization.mintRevenues.reduce((sum, current) => sum + (+ current.revenue), 0)}` : '0'}
              </span>
            </div>
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-[#251B37] uppercase text-3xl leading-normal">
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Revenue (in KLAY)</th>
                  <th className="py-3 px-6 text-left">Source</th>
                </tr>
              </thead>
              <tbody className="text-3xl font-light">
                {monetization?.donationRevenues && monetization.donationRevenues.length > 0 && monetization.donationRevenues.map((donationRevenue, i) => (
                  <tr className="border-b border-[#372948] hover:bg-[#372948]/[0.9] bg-[#372948]" key={i}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{(donationRevenue.address)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{(donationRevenue.revenue)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">Donation</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {monetization?.mintRevenues && monetization.mintRevenues.length > 0 && monetization.mintRevenues.map((mintRevenue, i) => (
                  <tr className="border-b border-[#372948] hover:bg-[#372948]/[0.9] bg-[#372948]" key={i}>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{(mintRevenue.address)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">{(mintRevenue.revenue)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="font-medium">Minting</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonetizationView;
