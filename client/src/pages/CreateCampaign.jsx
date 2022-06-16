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
    className="outline rounded-lg p-2 w-1/2"
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
    const { minimumContribution, title, introduction, imageURL, acceptThreshold ,detailInfor} = formCampaign;
    e.preventDefault();
    if (!minimumContribution || !title || !introduction || !imageURL || !acceptThreshold || !detailInfor) return;
    createNewCampaign();
  };

  return (
    <div className="text-left">
      <div className="text-3xl font-semibold text-center p-10">
        Create new campaign
      </div>
      
      <div className="text-2xl p-10">
        Title: &nbsp;&nbsp;&nbsp;
        <Input
          type="text"
          name="title"
          placeholder="Title of your campaign"
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

      <div className="text-2xl p-10">
        Image's URL: &nbsp;&nbsp;&nbsp;
        <Input
          type="text"
          name="imageURL"
          placeholder="Image illustrates your campaign"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        Minimum Contribution: &nbsp;&nbsp;&nbsp;
        <Input
          type="text"
          name="minimumContribution"
          placeholder="Minimum Contribution"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        Accept requests threshold: &nbsp;&nbsp;&nbsp;
        <Input
          type="text"
          name="acceptThreshold"
          placeholder="Accept requests threshold (%)"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        Detail Information: &nbsp;&nbsp;&nbsp;
        <Input
          type="text"
          name="detailInfor"
          placeholder="Information about your campaign"
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
