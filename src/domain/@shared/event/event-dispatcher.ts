import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }
    notify(event: EventInterface): void {
        const eventName: string = event.constructor.name;
        if (!this.eventHandlers[eventName]) {
            return;
        }
        this.eventHandlers[eventName].forEach((handler: EventHandlerInterface<EventInterface>) => {
            handler.handle(event);
        });
    }
    register(event: string, handler: EventHandlerInterface<EventInterface>): void {

        if (!this.eventHandlers[event]) {
            this.eventHandlers[event] = [];
        }

        this.eventHandlers[event].push(handler);

    }
    unregister(event: string, handler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers[event]) {
            return;
        }
        const index = this.eventHandlers[event].indexOf(handler);
        if (index !== -1) {
            this.eventHandlers[event].splice(index, 1);
        }
    }
    unregisterAll(): void {
        this.eventHandlers = {};
    }


}