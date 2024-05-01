import CustomerChangedAddress from "../customer-changed-address.event";
import SendConsoleLogWhenAddressWasUpdatedHandler from "./send-console-log-when-address-was-updated";

describe("SendConsoleLogWhenAddressWasUpdatedHandler", () => {
    it("should handle the event when address was updated", () => {
        const handler = new SendConsoleLogWhenAddressWasUpdatedHandler();

        const event = new CustomerChangedAddress({
            customerId: "1",
            name: "test",
            address: "test"
        });
        const consoleSpy = jest.spyOn(console, 'log');

        handler.handle(event);

        expect(consoleSpy).toHaveBeenCalledTimes(1);
    });
});