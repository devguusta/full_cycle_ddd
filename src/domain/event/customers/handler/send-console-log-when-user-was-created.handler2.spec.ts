import CustomerCreatedEvent from "../customer-created.event";
import SendConsoleLog2WhenUserWasCreatedHandler from "./send-console-log-when-user-was-created.handler2";

describe("SendConsoleLogWhenUserWasCreatedHandler2", () => {
    it("should handle the event when handle 2 was called", () => {
        const handler = new SendConsoleLog2WhenUserWasCreatedHandler();
      
        const event = new CustomerCreatedEvent({
            customerId: "1",
            name: "test"
        });
        const consoleSpy = jest.spyOn(console, 'log');

        handler.handle(event);

        expect(consoleSpy).toHaveBeenCalledTimes(2);
    });
});