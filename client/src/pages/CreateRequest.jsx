import React, { useContext, useEffect } from "react";
import { CampaignContext } from "../context/Campaign";
import { useParams } from "react-router";
import { Loader } from "../components";
import { Link } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";

const Input = ({ placeholder, name, type, handleChangeRequest }) => (
  <input
    placeholder={placeholder}
    type={type}
    // value = {minimumContribution}
    className="outline rounded-lg p-2 m-5 w-2/5"
    onChange={(e) => handleChangeRequest(e, name)}
  />
);

const CreateRequest = () => {
  const {
    isLoadingNewRequest,
    formRequest,
    createNewRequest,
    handleChangeRequest,
    setCampaignAddress,
  } = useContext(CampaignContext);

  const { id } = useParams();
  const address = id;
  useEffect(() => {
    setCampaignAddress(address);
  }, []);

  const handleSubmitRequest = (e) => {
    const { value } = formRequest;
    e.preventDefault();
    if (!value) return;
    createNewRequest();
  };

  return (
    <div>
      <div className="text-3xl font-semibold text-center p-20">
        Create New Request for Campaigns: &nbsp;
        <Link to={`/campaigns/${address}`}>{shortenAddress(address)}</Link>
      </div>
      <div className="text-2xl ml-20">
        <div>
          Description : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input
            type="text"
            name="description"
            placeholder="Description about request"
            handleChangeRequest={handleChangeRequest}
          />
        </div>
        <div>
          Required Amount : &nbsp;&nbsp;
          <Input
            type="text"
            name="value"
            placeholder="Value (ether)"
            handleChangeRequest={handleChangeRequest}
          />
        </div>
        <div>
          Recipient : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input
            type="text"
            name="recipient"
            placeholder="Address of recipient"
            handleChangeRequest={handleChangeRequest}
          />
        </div>
        {isLoadingNewRequest ? (
          <Loader />
        ) : (
          <button
            type="button"
            onClick={handleSubmitRequest}
            className="font-semibold justify-center items-center my-20 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#FACA15]"
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateRequest;
