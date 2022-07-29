import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { CampaignContext } from "../context/Campaign";
import { Loader } from "../components";
import { shortenAddress } from "../utils/shortenAddress";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";

const Request = ({
  id,
  request,
  approversCount,
  acceptRequest,
  finalizeRequest,
  totalBalances,
  currentAccount,
  manager,
  isAcceptedRequest
}) => {
  let rate = 0

  let approvalBalancesTmp = request.approvalBalances
  // console.log(approvalBalancesTmp);
  // approvalBalancesTmp = new BigNumber(approvalBalancesTmp)
  // approvalBalancesTmp = approvalBalancesTmp.div(new BigNumber(10**18))
  approvalBalancesTmp /= 10**18
  // console.log(tmp);
  // console.log(totalBalances)
  // approvalBalancesTmp = parseInt(detailOfCampaign[0]).toString();
  // approvalBalancesTmp = ethers.BigNumber.from(approvalBalancesTmp);
  // approvalBalancesTmp2 = ethers.utils.formatEther(approvalBalancesTmp2);
  if(totalBalances == 0) rate = 0;
  else{
    rate = approvalBalancesTmp * 100 / totalBalances ;
  rate = rate.toFixed(2)
  }
  
  // console.log(approvalBalancesTmp);
  // console.log("Hello");
  // console.log(totalBalances);
  // console.log("Guy");
  // console.log(rate)
//   console.log("Cur", currentAccount);
//   console.log("Man", manager);
// console.log(currentAccount == manager.toUpperCase());
  return (
    <tr>
      <td className="px-6 py-6">{id + 1}</td>
      <td>{request.description}</td>
      <td>{request.value}</td>
      <td>
        <a
          href={`https://rinkeby.etherscan.io/address/${request.recipient}`}
          target="_blank"
          rel="noreferrer"
          className="hover:text-blue-500 hover:font-bold"
        >
          {shortenAddress(request.recipient)}
        </a>
      </td>
      <td className="">
        {/* {request.approvalCount} / {approversCount} */}
        {/* {request.approvalBalances} / {totalBalances} */}
        {request.complete ?(
          <span>
            --
          </span>
        ):(
          <span>
            {rate} %
          </span>
        )}
        
      </td>
      <td className="font-bold uppercase">{request.complete.toString()}</td>
      <td>
        
        {!isAcceptedRequest ? (
          <button
          type="button"
          className="outline p-2 bg-[#31C48D] hover:bg-[#76A9FA] hover:font-bold"
          onClick={(e) => acceptRequest(e, id)}
        >
          Accept
        </button>
        ):(<button className="outline p-2 bg-slate-400 hover:cursor-auto">
          Accepted
        </button>)}
      </td>
      <td>
        
        {((!request.complete) && (currentAccount.toUpperCase() == manager.toUpperCase()))  ? (
          <button 
          type="button"
          className="outline p-2 bg-[#FACA15] hover:bg-[#F98080] hover:font-bold"
          onClick={(e) => finalizeRequest(e, id)}>
            Finalize
          </button>
        ):(
        (currentAccount.toUpperCase() == manager.toUpperCase())?(
        <button 
        className="outline p-2 bg-slate-400 hover:cursor-auto">
          Finalized
        </button>
        ):(
        <button 
        className="outline p-2 bg-slate-400 hover:cursor-auto">
          Finalize
        </button>
        )
        )}
        
        {/* )} */}
      </td>
    </tr>
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
    isLoadingFinalizeRequest,
    totalBalances,
    detailCampaign,
    currentAccount,
    getIsAcceptedRequest,
    isAcceptedRequest
  } = useContext(CampaignContext);
  const { id } = useParams();
  const address = id;
  useEffect(() => {
    setCampaignAddress(address);
  }, [address]);

  getAllRequests();
  // getIsAcceptedRequest();
  return (
    <div>
      <div className="text-center text-3xl p-20 font-semibold">
        All Requests of Campaign: &nbsp;&nbsp;
        <Link className="underline" to={`/campaigns/${address}`}>{shortenAddress(address)}</Link>
      </div>
      {requests.length ? (
        <div className="text-center text-2xl px-20">
          <table className="w-full text-left text-gray-700">
            <thead className="uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-6">Id</th>
                <th>Description</th>
                <th>Value (ether)</th>
                <th>Recipient</th>
                <th>Approval Balance</th>
                <th>Complete</th>
                <th>Accept</th>
                <th>Finalize</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, id) => (
                <Request
                  key={id}
                  id={id}
                  request={request}
                  approversCount={approversCount}
                  acceptRequest={acceptRequest}
                  isLoadingAcceptRequest={isLoadingAcceptRequest}
                  finalizeRequest={finalizeRequest}
                  isLoadingFinalizeRequest={isLoadingFinalizeRequest}
                  totalBalances={totalBalances}
                  currentAccount={currentAccount}
                  manager={detailCampaign.manager}
                  isAcceptedRequest={isAcceptedRequest}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-3xl">
          Do not exist any request
          </div>
      )}

      <div>
        {(isLoadingAcceptRequest || isLoadingFinalizeRequest) && <Loader />}
      </div>
      <div className="text-center py-20">
        
        {currentAccount.toUpperCase() == detailCampaign.manager.toUpperCase() ? (
          <button className="text-3xl font-semibold text-center justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#eab308]">
          <Link to="new">Add Request</Link>
        </button>
        ):(
          <button className="text-3xl font-semibold text-center justify-center items-center my-5 bg-slate-400 p-3 rounded-full cursor-auto ">
          Add Request
        </button>
        )}
        {}
      </div>
    </div>
  );
};

export default Requests;
