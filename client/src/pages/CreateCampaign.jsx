import React, { useContext } from "react";
import { CampaignFactoryContext } from "../context/CampaignFactory";
import { Loader } from "../components";


const Input = ({
  placeholder,
  name,
  type,
  minimumContribution,
  handleChangeCampaign,
}) => (
  <input
    placeholder={placeholder}
    type={type}
    // value = {minimumContribution}
    className="outline"
    onChange={(e) => handleChangeCampaign(e, name)}
  />
);

const CreateCampaign = () => {
  const {
    isLoadingNewCampaign,
    handleChangeCampaign,
    formCampaign,
    createNewCampaign,
  } = useContext(CampaignFactoryContext);

  const handleSubmitCampaign = (e) => {
    const { minimumContribution } = formCampaign;
    e.preventDefault();
    if (!minimumContribution) return;
    createNewCampaign();
  };

  return (
    <div>

      <div>Create a new campaign:</div>
      <div>
        Minimum Contribution
        <br />
        <Input
          type="text"
          name="minimumContribution"
          placeholder="Contribution (ether)"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>
      {isLoadingNewCampaign ? (
        <Loader />
      ) : (
        <button
          type="button"
          onClick={handleSubmitCampaign}
          className="flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default CreateCampaign;
