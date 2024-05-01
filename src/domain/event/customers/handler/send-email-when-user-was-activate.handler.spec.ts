import EventDispatcher from "../../@shared/event-dispatcher";
import CustomerActivatedEvent from "../customer-activated.event";
import SendEmailWhenUserWasActivateHandle from "./send-email-when-user-was-activate.handler";


describe("Send email when user was activate handler tests", () => {


    it("should send email when user was activate", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenUserWasActivateHandle();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        // Arrange
        const event = new CustomerActivatedEvent({
            email: "teste@gmail.com",
            name: "Teste",
        });

        eventDispatcher.register("CustomerActivatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerActivatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerActivatedEvent"].length).toBe(1);


        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalled();


    });

    it("should send two email when two users was activate", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenUserWasActivateHandle();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        // Arrange
        const event = new CustomerActivatedEvent({
            email: "teste@gmail.com",
            name: "Teste",
        });

        const event2 = new CustomerActivatedEvent({
            email: "teste2@gmail.com",
            name: "Teste",
        });

        eventDispatcher.register("CustomerActivatedEvent", eventHandler);


        eventDispatcher.register("CustomerActivatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerActivatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerActivatedEvent"].length).toBe(2);


        eventDispatcher.notify(event);

        expect(spyEventHandler).toHaveBeenCalledTimes(2);

    });
}

);