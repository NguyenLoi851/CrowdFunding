import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { CampaignContext } from "../context/Campaign";
import { Loader } from "../components";
import { shortenAddress } from "../utils/shortenAddress";
import { ethers } from "ethers";

const Request = ({
  id,
  request,
  approversCount,
  acceptRequest,
  finalizeRequest,
  totalBalances
}) => {
  let approvalBalancesTmp = request.approvalBalances
  // approvalBalancesTmp = parseInt(detailOfCampaign[0]).toString();
  approvalBalancesTmp = ethers.BigNumber.from(approvalBalancesTmp);
  approvalBalancesTmp = ethers.utils.formatEther(approvalBalancesTmp);
  const rate = approvalBalancesTmp * 100 / totalBalances ;
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
        >
          {shortenAddress(request.recipient)}
        </a>
      </td>
      <td className="justify-center">
        {/* {request.approvalCount} / {approversCount} */}
        {/* {request.approvalBalances} / {totalBalances} */}
        {rate}
      </td>
      <td className="font-bold uppercase">{request.complete.toString()}</td>
      <td>
        <button
          type="button"
          className="outline p-2 bg-[#31C48D] hover:bg-[#76A9FA]"
          onClick={(e) => acceptRequest(e, id)}
        >
          Accept
        </button>
      </td>
      <td>
        {/* {request.complete ? (
          <button
            type="button"
            className="outline p-2 bg-[#F98080] hover:bg-[#F98080] cursor-auto"
            // onClick={(e) => finalizeRequest(e, id)}

          >
            Finalize
          </button>
        ) : ( */}
        <button
          type="button"
          className="outline p-2 bg-[#FACA15] hover:bg-[#F98080]"
          onClick={(e) => finalizeRequest(e, id)}
        >
          Finalize
        </button>
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
    totalBalances
  } = useContext(CampaignContext);
  const { id } = useParams();
  const address = id;
  useEffect(() => {
    setCampaignAddress(address);
  }, [address]);

  getAllRequests();
  return (
    <div>
      <div className="text-center text-3xl p-20 font-semibold">
        All Requests of Campaign: &nbsp;&nbsp;
        <Link to={`/campaigns/${address}`}>{shortenAddress(address)}</Link>
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
        <button className="text-3xl font-semibold text-center justify-center items-center my-5 bg-[#29f2e3] p-3 rounded-full cursor-pointer hover:bg-[#eab308]">
          <Link to="new">Add Request</Link>
        </button>
      </div>
    </div>
  );
};

export default Requests;
