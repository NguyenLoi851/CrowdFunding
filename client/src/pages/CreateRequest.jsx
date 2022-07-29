import React, { useContext, useEffect } from "react";
import { CampaignContext } from "../context/Campaign";
import { useParams } from "react-router";
import { Loader } from "../components";
import { Link } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";

const Input = ({placeholder, name, type, handleChangeRequest }) => (
  <input
    placeholder={placeholder}
    type={type}
    // value = {minimumContribution}
    className="outline rounded-lg p-2 m-5 w-2/5 h-50"
    onChange={(e) => handleChangeRequest(e, name)}
  />
);

const Textarea = ({placeholder, name, type, handleChangeRequest }) => (
  <textarea
    placeholder={placeholder}
    type={type}
    // value = {minimumContribution}
    className="outline rounded-lg p-2 m-5 w-2/5 h-96"
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
    <div className="ml-40 mr-40">
      <div className="text-3xl font-semibold text-center p-20">
        Create New Request for Campaigns: &nbsp;
        <Link className="underline" to={`/campaigns/${address}`}>{shortenAddress(address)}</Link>
      </div>
      <div className="text-2xl ml-20">
        <div>
          <div>
            Description : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <Textarea
            type="text"
            name="description"
            placeholder="Description about request"
            handleChangeRequest={handleChangeRequest}
          />
        </div>
        <div>
          <div>
            Required Amount : &nbsp;&nbsp;
          </div>
          
          <Input
            type="text"
            name="value"
            placeholder="Value (MATIC)"
            handleChangeRequest={handleChangeRequest}
          />
        </div>
        <div>
          <div>
            Recipient : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          
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
