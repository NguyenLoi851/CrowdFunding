import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CampaignFactoryContext } from "../context/CampaignFactory";
import { Navbar } from "../components";
import { shortenAddress } from "../utils/shortenAddress";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

const CampaignCard = ({ address }) => {
  return (
    <div>
      <div>Address:</div>
      {address}
      <div>
        <Link to={`campaigns/${address}`}>View detail campaign</Link>
      </div>
      <br />
    </div>
  );
};

const Home = () => {
  const { currentAccount, connectWallet, campaigns } = useContext(
    CampaignFactoryContext
  );

  return (
    <div>
      <Navbar />
      <div className="flex flex-row">
        <div>
          {!currentAccount ? (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <p className="<div>Campaigns</div>text-white text-base font-semibold">
                Connect Wallet
              </p>
            </button>
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
                    <p className="text-white font-light text-sm">
                      {shortenAddress(currentAccount)}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1">
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
            <Link to="campaigns/new">Create new campaign</Link>
          </button>
        </div>
      </div>

      <div>
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Campaigns
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div>
          {campaigns.reverse().map((campaign, i) => (
            <CampaignCard key={i} {...campaign} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
