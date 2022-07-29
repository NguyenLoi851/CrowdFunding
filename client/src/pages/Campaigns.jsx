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
    idCampaign,
    introduction,
    title,
    imageURL,
    detailInfor,
    // error,
    // setError
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
    // displayErrorModal();
  };

  // const displayErrorModal = ()=>{
  //   {error!="" && (
  //     // alert(error)
  //     <div>
  //       Hello
  //     </div>
  //   )}
  //   setError("");
  // }
  
  // useEffect(() => {
  //   displayErrorModal();
  // }, [error])
  

  return (
    <div className="ml-40 mr-40">
      <div className="text-3xl text-center font-semibold p-20">
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
      <br />
      <div className="bg-yellow-600 text-yellow-600">.</div>
      <br /><br /><br />

      {/* <div className="flex justify-between text-2xl"> */}
      <div className="justify-between text-2xl ">
        {/* <div className="ml-20 w-1/5">
          <img src={imageURL} />
        </div> */}
        <div className="ml-20 mr-20 pr-20">
          <br /><br />
          <div className="font-bold text-center">{title}</div>
          <br />
          <br />
          <div className="text-center">{introduction}</div>
          <br />
          <div className="flex my-20 justify-center">
            <div className="text-3xl justify-between">
            <button className="justify-center items-center bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#eab308]">
              <Link to="requests">View Requests</Link>
            </button>
          </div>
          <div className="ml-20 mt-3">
            Accept threshold: {detailCampaign.acceptThreshold} % (balances)
          </div></div>
         
        </div>
      </div>

      <div className="flex justify-center">
        <img className="w-2/3" src={imageURL}/>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="text-3xl ml-20 mr-20 text-justify leading-loose">{detailInfor}</div>
      <br /><br /><br /><br /><br />
    </div>
  );
};

export default Campaigns;
