import CustomerCreatedEvent from "../customer-created.event";
import SendConsoleLogWhenUserWasCreatedHandler from "./send-console-log-when-user-was-created.handler";

describe("SendConsoleLogWhenUserWasCreatedHandler", () => {


    it("should handle the event when handle function was called", () => {
        const handler = new SendConsoleLogWhenUserWasCreatedHandler();
        const event = new CustomerCreatedEvent({
            customerId: "1",
            name: "test"
        });
        const spyEventHandler = jest.spyOn(handler, "handle");
        const consoleSpy = jest.spyOn(console, 'log');

        handler.handle(event);

        expect(consoleSpy).toHaveBeenCalledWith(`This is the first console.log of event: CustomerCreatedEvent`);
    });

   

});