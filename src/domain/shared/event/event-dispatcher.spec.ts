import EventDispatcher from "./event-dispatcher";
import {SendEmailWhenProductCreatedHandler} from "../../product/event/handler/send-email-product-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";

describe("Domain events test", () => {

    let eventDispatcher: EventDispatcher;

    beforeEach(() => {
        eventDispatcher = new EventDispatcher();
    })

    // tslint:disable:no-string-literal
    describe("notify", () => {
        it("should notify all handlers", ()=>{
            const eventHandler = new SendEmailWhenProductCreatedHandler();
            const spy = jest.spyOn(eventHandler, "handle")

            eventDispatcher.register("ProductCreatedEvent", eventHandler)

            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

            const event = new ProductCreatedEvent({name:"Product 1", email:"any_email@mail.com"});

            eventDispatcher.notify(event)

            expect(spy).toHaveBeenCalled()

        })
    })

    describe("register", () => {

        it("should register an event handler", () => {
            const eventHandler = new SendEmailWhenProductCreatedHandler();

            eventDispatcher.register("ProductCreatedEvent", eventHandler)

            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
        })

    })

    describe("unregister", () => {
        it("should unregister an event handler", () => {
            const eventHandler = new SendEmailWhenProductCreatedHandler();

            eventDispatcher.register("ProductCreatedEvent", eventHandler)
            eventDispatcher.register("ProductCreatedEvent", new SendEmailWhenProductCreatedHandler())

            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2)

            eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)
        })
    })

    describe("unregisterAll", () => {
        it("should unregister all event handlers", () => {
            const eventHandler = new SendEmailWhenProductCreatedHandler();

            eventDispatcher.register("ProductCreatedEvent", eventHandler)
            eventDispatcher.register("ProductCreatedEvent", new SendEmailWhenProductCreatedHandler())

            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
            expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(2)

            eventDispatcher.unregisterAll();

            expect(eventDispatcher.getEventHandlers).toBeFalsy()
        })
    })
})