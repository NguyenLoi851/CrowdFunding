import React, { useContext, useEffect } from "react";
import { CampaignContext } from "../context/Campaign";
import { useParams } from "react-router";
import { Loader } from "../components";

const Input = ({ placeholder, name, type, handleChangeRequest }) => (
  <input
    placeholder={placeholder}
    type={type}
    // value = {minimumContribution}
    className="outline"
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
      <div>Create a Request</div>
      <div>
        Description
        <br />
        <Input
          type="text"
          name="description"
          placeholder="Description about request"
          handleChangeRequest={handleChangeRequest}
        />
      </div>
      <div>
        Amount in Ether:
        <br />
        <Input
          type="text"
          name="value"
          placeholder="Value (ether)"
          handleChangeRequest={handleChangeRequest}
        />
      </div>
      <div>
        Recipient:
        <br />
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
          className="flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          Create
        </button>
      )}
    </div>
  );
};

export default CreateRequest;
