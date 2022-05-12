import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { CampaignContext } from "../context/Campaign";
import { Loader } from "../components";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";

const Input = ({
  placeholder,
  name,
  type,
  minimumContribution,
  handleChangeContributeCampaign,
}) => (
  <input
    placeholder={placeholder}
    type={type}
    className="outline rounded-lg p-2"
    onChange={(e) => handleChangeContributeCampaign(e, name)}
  />
);

const Campaigns = () => {
  const {
    detailCampaign,
    setCampaignAddress,
    getDetailInfo,
    campaignAddress,
    handleChangeContributeCampaign,
    isLoadingContributeCampaign,
    formContributeCampaign,
    contributeCampaign,
  } = useContext(CampaignContext);
  const { id } = useParams();
  const address = id;
  useEffect(() => {
    setCampaignAddress(address);
  }, []);

  const handleSubmitContributeCampaign = (e) => {
    const { contribution } = formContributeCampaign;
    e.preventDefault();
    if (!contribution) return;
    contributeCampaign();
  };

  return (
    <div>
      <div className="text-2xl text-center font-semibold p-20">
        Campaign Details
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-4 text-2xl p-5">
        <div className="outline p-10">
          {" "}
          {detailCampaign.balance}
          <br />
          Campaign Balance
        </div>
        <div className="outline p-10">
          {detailCampaign.minimumContribution} (ether) <br />
          Minimum Contribution
        </div>
        <div className="outline p-10">
          {detailCampaign.numRequests} <br />
          Pending Requests
        </div>
        <div className="outline p-10">
          {detailCampaign.approversCount} <br />
          Contributors
        </div>
        <div className="outline p-10">
          {shortenAddress(detailCampaign.manager)} <br />
          Manager
        </div>
        <div className="outline p-10">
          <div>
            Contribute to this campaign!
            <br />
            <br />
            <Input
              type="text"
              name="contribution"
              placeholder="Contribution (ether)"
              handleChangeContributeCampaign={handleChangeContributeCampaign}
            />
          </div>
          {isLoadingContributeCampaign ? (
            <Loader />
          ) : (
            <button
              type="button"
              onClick={handleSubmitContributeCampaign}
              className="flex flex-row mt-10 justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#eab308]"
            >
              Contribute
            </button>
          )}
        </div>
      </div>
      <div className="text-center text-3xl">
        <button className="justify-center items-center my-20 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#eab308]">
          <Link to="requests">View Requests</Link>
        </button>
      </div>
    </div>
  );
};

export default Campaigns;
