import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerActivatedEvent from "../customer-activated.event";

export default class SendEmailWhenUserWasActivateHandle implements EventHandlerInterface {
    handle(event: CustomerActivatedEvent) {
        console.log(`Email sent: ${event.eventData.email} your account was activated!. If you have any questions, please contact us.`);
    }
}   