import React, { useContext } from "react";
import landing from "../../images/landing.jpg";
import { Link } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { CampaignFactoryContext } from "../context/CampaignFactory";

const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(CampaignFactoryContext);
  return (
    <nav>
      <div>
        <Link to="/">
          <img src={landing} alt="logo" className="w-full cursor-pointer" />
        </Link>
      </div>

      <div className="flex flex-row">
        <div>
          {!currentAccount ? (
            <div className="pt-40 pl-10 mt-2 px-100 item-center">
              <button
                type="button"
                onClick={connectWallet}
                className="ml-20 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#f97316]"
              >
                <p className="text-5xl text-black text-base font-semibold">
                  Connect Wallet
                </p>
              </button>
            </div>
          ) : (
            <div className="flex items-left p-10 justify-start w-full mf:mt-0 mt-0">
              <div className="p-3 flex justify-end items-start flex-col rounded-xl h-60 sm:w-96 w-full my-5 eth-card white-glassmorphism ">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>

                  <div>
                    <p className="text-white text-2xl font-light text-sm">
                      {shortenAddress(currentAccount)}
                    </p>
                    <p className="text-white text-3xl font-semibold mt-1">
                      Ethereum
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="text-3xl sm:text-5xl mt-5 pt-40 pl-10">
          Loi Crowdfunding Community
        </div>
        <div className="mt-40 pl-10">
          <button
            type="button"
            className="text-5xl justify-center items-center bg-[#29f2e3] p-5 rounded-full cursor-pointer hover:bg-[#f97316]"
          >
            <Link to="/campaigns/new">Create new campaign</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
