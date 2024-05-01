import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import Address from "../value-object/address";
import Customer from "../entity/customer";
import EventDispatcherInterface from "../event/@shared/event-dispatcher.interface";
import EventHandlerInterface from "../event/@shared/event-handler.interface";
import CustomerChangedAddress from "../event/customers/customer-changed-address.event";
import CustomerCreatedEvent from "../event/customers/customer-created.event";
import CustomerRepositoryInterface from "../repository/customer-repository.interface";

import { v4 as uuid } from 'uuid';

export default class CustomerService {

    constructor(private customerRepository: CustomerRepositoryInterface, private eventHandlerInterface: EventHandlerInterface,
        private eventDispatcher: EventDispatcherInterface,
        private secondEventHandlerInterface?: EventHandlerInterface,
    ) {


    };

    createCustomer(name: string, id: string): Customer {
        const customer = new Customer(id, name);
        this.eventDispatcher.register("CustomerCreatedEvent", this.eventHandlerInterface);
        if (this.secondEventHandlerInterface) {
            this.eventDispatcher.register("CustomerCreatedEvent", this.secondEventHandlerInterface);
        }

        const event = new CustomerCreatedEvent({
            customerId: customer.id,
            name: customer.name
        })

        this.eventDispatcher.notify(event);

        return customer;



    }

    updateCustomerAddress(customer: Customer, address: Address): void {
        customer.changeAddress(address)
        this.eventDispatcher.register("CustomerChangedAddress", this.eventHandlerInterface);
        const event = new CustomerChangedAddress({
            customerId: customer.id,
            name: customer.name,
            address: customer.address
        })

        this.eventDispatcher.notify(event);


    }
}