//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    event NewCampaign(address from, uint256 minimum, string _id);

    function createCampaign(uint256 minimum, string memory _id, uint256 _acceptThreshold) public {
        Campaign newCampaign = new Campaign(minimum, _id, _acceptThreshold, msg.sender);
        deployedCampaigns.push(newCampaign);
        emit NewCampaign(msg.sender, minimum, _id);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}
