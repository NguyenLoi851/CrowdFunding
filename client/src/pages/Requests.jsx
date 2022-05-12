import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { CampaignContext } from "../context/Campaign";
import { Loader } from "../components";

const Request = ({ id, request, approversCount, acceptRequest,isLoadingAcceptRequest, finalizeRequest,isLoadingFinalizeRequest }) => {
  return (
    <div>
      <div className="text-orange-600">Id: {id + 1}</div>
      <div>Description: {request.description}</div>
      <div>Value: {request.value}</div>
      <div>Recipient: {request.recipient}</div>
      <div>
        Approval Count: {request.approvalCount} / {approversCount}
      </div>
      <div>Complete: {request.complete.toString()}</div>
      
      <button type="button" className="outline" onClick={(e)=> acceptRequest(e,id)}>
        Accept
      </button>
      {isLoadingAcceptRequest && (<Loader />)}
      <br />
      <br />
      <button type="button" className="outline" onClick={(e)=>finalizeRequest(e, id)}>
        Finalize
      </button>
      {isLoadingFinalizeRequest && (<Loader />)}
      {/* <button type="button" className='outline' onClick={rejectRequest}>
      Reject
    </button> */}
      <br />
      <br />
    </div>
  );
};

const Requests = () => {
  const {
    getAllRequests,
    setCampaignAddress,
    requestCount,
    requests,
    approversCount,
    acceptRequest,
    isLoadingAcceptRequest,
    finalizeRequest,
    isLoadingFinalizeRequest
  } = useContext(CampaignContext);
  const { id } = useParams();
  const address = id;
  useEffect(() => {
    setCampaignAddress(address);
  }, [address]);

  getAllRequests();
  return (
    <div>
      <div>Requests</div>

      <div>Pending Requests:</div>
      {requests.map((request, id) => (
        <Request
          key={id}
          id={id}
          request={request}
          approversCount={approversCount}
          acceptRequest={acceptRequest}
          isLoadingAcceptRequest={isLoadingAcceptRequest}
          finalizeRequest = {finalizeRequest}
          isLoadingFinalizeRequest = {isLoadingFinalizeRequest}
        />
      ))}
      <button className="flex flex-row justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
        <Link to="new">Add Request</Link>
      </button>
    </div>
  );
};

export default Requests;
