import CustomerRepository from "../../infrastructure/repository/customer.repository";
import EventDispatcher from "../event/@shared/event-dispatcher";
import SendConsoleLogWhenUserWasCreatedHandler from "../event/customers/handler/send-console-log-when-user-was-created.handler";
import SendConsoleLog2WhenUserWasCreatedHandler from "../event/customers/handler/send-console-log-when-user-was-created.handler2";
import CustomerService from "./customer.service";
import { v4 as uuid } from 'uuid';
describe("Customer service tests", () => {


    it("should create a customer and notify the listeners", async () => {

        const customerRepository = new CustomerRepository();
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendConsoleLogWhenUserWasCreatedHandler();
        const eventHandler2 = new SendConsoleLog2WhenUserWasCreatedHandler();
        const customerService = new CustomerService(customerRepository, eventHandler, eventDispatcher, eventHandler2);
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const customer = customerService.createCustomer("test", uuid());

        expect(customer).toBeDefined();
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("test");

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler);

        expect(spyEventHandler).toHaveBeenCalledTimes(1)
        expect(spyEventHandler2).toHaveBeenCalledTimes(1)

    });
});