import EventHandlerInterface from "../../@shared/event-handler.interface";

import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogWhenUserWasCreatedHandler implements EventHandlerInterface {
    handle(event: CustomerCreatedEvent) {
        console.log(`This is the first console.log of event: ${event}`);
    }

    handle2(event: CustomerCreatedEvent) {
        console.log(`This is the second console.log of event: ${event}`);
    }
}   