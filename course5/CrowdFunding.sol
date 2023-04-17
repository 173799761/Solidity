/**
 *Submitted for verification at Etherscan.io on 2023-04-17
*/

// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;
//创建不同的募资活动，用来募集以太坊
//记录相应活动下的募资总体信息(参与人数，募集的以太坊数量) 以及记录参与的用户地址以及投入数量
//业务逻辑 (用户参与 添加新的募集活动 活动结束后进行资金领取)

contract CrowdFundingStorage{
    struct Campaign{
        address payable receiver;
        uint numFunders;
        uint fundingGoal;
        uint totalAmount;
    }

    struct Funder{
        address addr;
        uint amount;
    }

    uint public numCampaigns;
    mapping(uint => Campaign) campaigns;
    mapping(uint => Funder[]) funders;
    mapping(uint => mapping(address => bool)) public isParticipate;

    
}

//继承CrowdFundingStorage
contract CrowdFunding is CrowdFundingStorage{

    address immutable owner;

    constructor(){
        owner = msg.sender;
    }

    // event CampaignLog(unint campaignID,address receiver,uint goal);

    // event BidLog(uint campaignId, address addr, uint amount);

    modifier judgeParticipate(uint campaignID){
        require(isParticipate[campaignID][msg.sender] == false);
        _;
    }

    modifier isOwner(){
        require(msg.sender == owner);
        _;
    }

    // event CampaignLog(uint campaignId, address receiver, uint goal);

    // event BidLog(uint campaignId, address addr, uint amount);
    event CampaignLog(uint campaignId, address receiver, uint goal);

    event BidLog(uint campaignId, address addr, uint amount);

    function newCampaign(address payable receiver,uint goal) external isOwner() returns(uint campaignID){
        campaignID = numCampaigns++;
        Campaign storage c = campaigns[campaignID];
        c.receiver = receiver;
        c.fundingGoal = goal;
        emit CampaignLog(campaignID,receiver,goal);
    }

    function bid(uint campaignID) external payable judgeParticipate(campaignID){
        Campaign storage c = campaigns[campaignID];

        c.totalAmount += msg.value;
        c.numFunders += 1;

        funders[campaignID].push(Funder({
            addr: msg.sender,
            amount:msg.value
        }));

        isParticipate[campaignID][msg.sender] = true;

        emit BidLog(campaignID, msg.sender, msg.value);
    }

    function withdraw(uint campaignID) external returns(bool reached){
        Campaign storage c = campaigns[campaignID];

        if(c.totalAmount < c.fundingGoal){
            return false;
        }

        uint amount = c.totalAmount;
        c.totalAmount = 0;
        c.receiver.transfer(amount);

        return true;
    }
}