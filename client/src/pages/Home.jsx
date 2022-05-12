import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CampaignFactoryContext } from "../context/CampaignFactory";

const CampaignCard = ({ address }) => {
  return (
    <div className="text-2xl text-center py-10">
      <div>
        <a
          href={`https://rinkeby.etherscan.io/address/${address}`}
          target="_blank"
          rel="noreferrer"
        >
          <p className="p-3">Campaign Address: {address}</p>
        </a>
      </div>
      <div>
        <Link to={`campaigns/${address}`}>View detail campaign</Link>
      </div>
      <br />
    </div>
  );
};

const Home = () => {
  const { currentAccount, campaigns } = useContext(CampaignFactoryContext);

  return (
    <div>
      <div>
        {currentAccount ? (
          <h3 className="text-5xl text-center my-2 pt-40 pb-10">
            Latest Campaigns
          </h3>
        ) : (
          <h3 className="text-5xl text-center my-2 pt-40 pb-10">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div>
          {campaigns.reverse().map((campaign, i) => (
            <CampaignCard key={i} {...campaign} />
          ))}
        </div>
      </div>
      <div className="py-10"></div>
    </div>
  );
};

export default Home;
