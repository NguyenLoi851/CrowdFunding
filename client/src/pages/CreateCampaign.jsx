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
    className="outline rounded-lg p-2 w-1/2 m-5"
    onChange={(e) => handleChangeCampaign(e, name)}
  />
);

const Textarea = ({
  placeholder,
  name,
  type,
  minimumContribution,
  handleChangeCampaign,
}) => (
  <textarea
    placeholder={placeholder}
    type={type}
    className="outline rounded-lg p-2 w-full m-5 h-96"
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
    <div className="text-left mr-40 ml-40">
      <div className="text-3xl font-semibold text-center p-10">
        Create new campaign
      </div>
      
      <div className="text-2xl p-10">
        <div>
          Title: &nbsp;&nbsp;&nbsp;
        </div>
        
        <Textarea
          type="text"
          name="title"
          placeholder="Title of your campaign"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        <div>
          Introduction: &nbsp;&nbsp;&nbsp;
        </div>
        
        <Textarea
          type="text"
          name="introduction"
          placeholder="Intro about your campaign"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        <div>
          Image's URL: &nbsp;&nbsp;&nbsp;
        </div>
        
        <Textarea
          type="text"
          name="imageURL"
          placeholder="Image illustrates your campaign"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        <div>
          Minimum Contribution: &nbsp;&nbsp;&nbsp;
        </div>
        
        <Input
          type="text"
          name="minimumContribution"
          placeholder="Minimum Contribution (MATIC)"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        <div>
          Accept requests threshold: &nbsp;&nbsp;&nbsp;
        </div>
        
        <Input
          type="text"
          name="acceptThreshold"
          placeholder="Accept requests threshold (%)"
          handleChangeCampaign={handleChangeCampaign}
        />
      </div>

      <div className="text-2xl p-10">
        <div>
          Detail Information: &nbsp;&nbsp;&nbsp;
        </div>
        
        <Textarea
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
