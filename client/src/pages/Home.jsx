import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CampaignFactoryContext } from "../context/CampaignFactory";
import { shortenAddress } from "../utils/shortenAddress";

const ColoredLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 5,
    }}
  />
);

const CampaignCard = ({ address, introduction, title, imageURL }) => {
  return (
    <div>
      <div className="bg-yellow-600">.</div>
      <div className="flex justify-between text-2xl py-10">
      <div className="ml-40 w-2/5">
        <img src={imageURL} />
      </div>

      <div className="ml-20 mr-20 ">
        <br />
        <div>{title}</div>
        <br />
        <div>{introduction}</div>
        <br />
        <br />
        <br />

        <div>
          <a
            href={`https://rinkeby.etherscan.io/address/${address}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="p-0">Campaign Address: {shortenAddress(address)}</p>
          </a>
        </div>
        <br />
        <div>
          <Link to={`campaigns/${address}`}>View detail campaign</Link>
        </div>
      </div>

      <br />
    </div>
    </div>
    
  );
};

const Home = () => {
  const { currentAccount, campaigns, introductions, titles, imageURLs } =
    useContext(CampaignFactoryContext);
  console.log(introductions);
  return (
    <div>
      <div>
        {currentAccount ? (
          <h3 className="text-5xl text-center my-2 pt-40 pb-10">
            Latest Campaigns
          </h3>
        ) : (
          <h3 className="text-5xl text-center my-2 pt-40 pb-10">
            Connect your account to see the latest campaigns
          </h3>
        )}

        <div>
          {campaigns.reverse().map((campaign, i) => (
            <CampaignCard
              key={i}
              {...campaign}
              introduction={introductions[i]}
              title={titles[i]}
              imageURL={imageURLs[i]}
            />
          ))}
        </div>
      </div>
      <div className="py-10"></div>
    </div>
  );
};

export default Home;
