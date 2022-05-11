import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CampaignFactoryContext } from "../context/CampaignFactory";

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
      <div>Home</div>
      <div>
        {!currentAccount && (
          <button
            type="button"
            onClick={connectWallet}
            className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
          >
            <p className="<div>Campaigns</div>text-white text-base font-semibold">
              Connect Wallet
            </p>
          </button>
        )}
        <p>{currentAccount}</p>
      </div>
      <div>
        <button
          type="button"
          className="flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          <Link to="campaigns/new">Create new campaign</Link>
        </button>
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
