import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(customer: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = customer;
    }

}