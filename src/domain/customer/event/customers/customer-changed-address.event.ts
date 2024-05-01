import EventInterface from "../../../@shared/event/event.interface";


export default class CustomerChangedAddress implements EventInterface {
    dataTimeOcurred: Date;
    eventData: any;

    constructor(customer: any) {
        this.dataTimeOcurred = new Date();
        this.eventData = customer;
    }

}