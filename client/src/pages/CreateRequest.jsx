import React,{useContext} from "react";
import { CampaignFactoryContext } from "../context/CampaignFactory";
/*
We need to write functions and declare variable:
handleChangeRequest, 
handleSubmitRequest,
createNewRequest

*/
// const Input = ({ placeholder, name, type, handleChangeRequest }) => (
//   <input
//     placeholder={placeholder}
//     type={type}
//     // value = {minimumContribution}
//     className="outline"
//     onChange={(e) => handleChangeRequest(e, name)}
//   />
// );

const CreateRequest = () => {
  // const {isLoadingNewRequest, formRequest} = useContext(CampaignFactoryContext)
  // const handleSubmitRequest = (e) => {
  //   // const {minimumContribution} = formCampaign
  //   e.preventDefault();
  //   // if(!minimumContribution) return;
  //   createNewRequest();
  // };

  return (
    <div>
      <div>Create a Request</div>
      {/* <div>
        Description
        <br />
        <Input type="text"
        name="description"
        placeholder="Description about request"/>
        handleChangeRequest = {handleChangeRequest}
      </div>
      <div>
        Amount in Ether:
        <br />
        <Input type="text"
        name="value"
        placeholder="Value (ether)"/>
        handleChangeRequest = {handleChangeRequest}
      </div>
      <div>
        Recipient:
        <br />
        <Input type="text"
        name="recipient"
        placeholder="Address of recipient"/>
        handleChangeRequest = {handleChangeRequest}
      </div>
      {isLoadingNewRequest ? (
        <Loader />
      ):(<button type="button" onClick={handleSubmitRequest} 
      className="flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
      Create</button>)} */}
    </div>
  );
};

export default CreateRequest;
