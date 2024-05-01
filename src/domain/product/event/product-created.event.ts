import EventInterface from "../../customer/event/@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface{
    dataTimeOcurred: Date;
    eventData: any;

    constructor(product: any){
        this.dataTimeOcurred = new Date();
        this.eventData = product;
    }
}