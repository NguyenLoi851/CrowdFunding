import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CampaignFactoryContext } from "../context/CampaignFactory";

const Home = () => {
  const { currentAccount, connectWallet } = useContext(CampaignFactoryContext);

  return (
    <div>
      <div>Home</div>
      <div>
        {!currentAccount && (
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <p className="text-white text-base font-semibold">
              Connect Wallet
            </p>
          </button>
        )}
        <p>
          {currentAccount}
        </p>
      </div>
      <div>
        <button type="button" className="flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
          <Link to="campaigns/new">
            Campaign
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
