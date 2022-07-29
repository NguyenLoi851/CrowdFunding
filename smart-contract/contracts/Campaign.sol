//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Campaign {

    struct Request {
        string description;
        uint256 value;
        address payable recipient;
        bool complete;
        uint256 approvalCount;
        uint256 approvalBalances;
        mapping(address => bool) approvals;
    }

    string public id; // id in database server
    address public manager;
    uint256 public minimumContribution;
    mapping(address => bool) public approvers;
    uint256 public approversCount;
    uint256 public acceptThreshold;
    mapping(address => uint256) public balance;

    uint256 numRequests;
    mapping(uint256 => Request) public requests;

    constructor(
        uint256 _minimum,
        string memory _id,
        uint256 _acceptThreshold,
        address creator
    ) {
        manager = creator;
        minimumContribution = _minimum;
        id = _id;
        acceptThreshold = _acceptThreshold;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}


    function contribute() public payable {
        require(
            msg.value >= minimumContribution,
            "A minimum contribution is required"
        );
        approvers[msg.sender] = true;
        approversCount++;
        balance[msg.sender] += msg.value;
        (bool sent, ) = payable(address(this)).call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }

    function createRequest(
        string memory description,
        uint256 value,
        address payable recipient
    ) public onlyManager {
        Request storage r = requests[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;
        r.approvalBalances = 0;
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];
        require(
            approvers[msg.sender],
            "Only contributors can approve a specific payment request"
        );
        require(
            !request.approvals[msg.sender],
            "You have already voted to approve this request"
        );
        request.approvals[msg.sender] = true;
        request.approvalCount++;
        request.approvalBalances += balance[msg.sender];
    }

    function finalizeRequest(uint256 index) public onlyManager {
        Request storage request = requests[index];
        require(
            // request.approvalCount > (approversCount / 2),
            request.approvalBalances * 100 / address(this).balance >= acceptThreshold,
            "This request needs more approval balances before it can be finalized"
        );
        require(
            request.complete == false,
            "This request has already been finalized"
        );
        // request.recipient.transfer(request.value);
        (bool sent, ) = payable(request.recipient).call{value: request.value}("");
        require(sent, "Failed to send Ether");
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            address,
            uint256
        )
    {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager,
            acceptThreshold
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return numRequests;
    }

    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only the campaign manager can call this function"
        );
        _;
    }
}
