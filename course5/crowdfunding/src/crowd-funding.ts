import {
  BidLog as BidLogEvent,
  CampaignLog as CampaignLogEvent
} from "../generated/CrowdFunding/CrowdFunding"
import { BidLog, CampaignLog } from "../generated/schema"

export function handleBidLog(event: BidLogEvent): void {
  let entity = new BidLog(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.addr = event.params.addr
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCampaignLog(event: CampaignLogEvent): void {
  let entity = new CampaignLog(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.campaignId = event.params.campaignId
  entity.receiver = event.params.receiver
  entity.goal = event.params.goal

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
