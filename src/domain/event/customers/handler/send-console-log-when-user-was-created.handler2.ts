import EventHandlerInterface from "../../@shared/event-handler.interface";

import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLog2WhenUserWasCreatedHandler implements EventHandlerInterface {
    handle(event: CustomerCreatedEvent) {
        console.log(`This is the second console.log of event: CustomerCreatedEvent`);
        console.log(`${event.eventData.customerId} - ${event.eventData.name}`)

    }


}   