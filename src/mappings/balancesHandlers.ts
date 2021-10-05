import {SubstrateEvent} from "@subql/types";
import {timestamp, eventId} from "./globalFunction";
import {Endowed} from "../types/models";

import {Balance} from "@polkadot/types/interfaces";

export async function handleEndowed(event: SubstrateEvent): Promise<void> {

    const {event: {data: [acountID, amount]}} = event;

    const address = acountID.toString();
    const amountBalance = (amount as Balance).toBigInt();

    const element = new Endowed(eventId(event));

    element.timestamp = timestamp(event.block);
    element.accCreated = address;
    element.endowedAmount = amountBalance;

    await element.save();
    logger.info('Endowed from' + address);
}
