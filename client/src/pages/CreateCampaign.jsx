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
    className="outline rounded-lg p-2 w-1/4"
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
    const { minimumContribution, introduction } = formCampaign;
    e.preventDefault();
    if (!minimumContribution || !introduction) return;
    createNewCampaign();
  };

  return (
    <div className="text-center">
      <div className="text-3xl font-semibold text-center p-10">
        Create new campaign
      </div>
      <div className="text-2xl p-10">
        Minimum Contribution: &nbsp;&nbsp;&nbsp;
        <Input
          type="text"
          name="minimumContribution"
          placeholder="Minimum Contribution (ether)"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>
      <div className="text-2xl p-10">
        Introduction: &nbsp;&nbsp;&nbsp;
        <Input
          type="text"
          name="introduction"
          placeholder="Intro about your campaign"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>
      <div className="text-center">
        {isLoadingNewCampaign ? (
          <Loader />
        ) : (
          <button
            type="button"
            onClick={handleSubmitCampaign}
            className="text-3xl font-bold justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#FACA15]"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateCampaign;
