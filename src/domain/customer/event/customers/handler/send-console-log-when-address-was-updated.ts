import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedAddress from "../customer-changed-address.event";

export default class SendConsoleLogWhenAddressWasUpdatedHandler implements EventHandlerInterface {
    handle(event: CustomerChangedAddress) {
        console.log(`Address of cliente: ${event.eventData.customerId}, ${event.eventData.name} was updated to ${event.eventData.address}`);
      
    }
}