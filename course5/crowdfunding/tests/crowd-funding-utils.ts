import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { BidLog, CampaignLog } from "../generated/CrowdFunding/CrowdFunding"

export function createBidLogEvent(
  campaignId: BigInt,
  addr: Address,
  amount: BigInt
): BidLog {
  let bidLogEvent = changetype<BidLog>(newMockEvent())

  bidLogEvent.parameters = new Array()

  bidLogEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  bidLogEvent.parameters.push(
    new ethereum.EventParam("addr", ethereum.Value.fromAddress(addr))
  )
  bidLogEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return bidLogEvent
}

export function createCampaignLogEvent(
  campaignId: BigInt,
  receiver: Address,
  goal: BigInt
): CampaignLog {
  let campaignLogEvent = changetype<CampaignLog>(newMockEvent())

  campaignLogEvent.parameters = new Array()

  campaignLogEvent.parameters.push(
    new ethereum.EventParam(
      "campaignId",
      ethereum.Value.fromUnsignedBigInt(campaignId)
    )
  )
  campaignLogEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )
  campaignLogEvent.parameters.push(
    new ethereum.EventParam("goal", ethereum.Value.fromUnsignedBigInt(goal))
  )

  return campaignLogEvent
}
