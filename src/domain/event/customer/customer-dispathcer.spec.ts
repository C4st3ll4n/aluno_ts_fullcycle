import EventDispatcher from "../shared/event-dispatcher";
import LogCustomerCreatedHandler from "./handler/log-customer-created.handler";
import CustomerCreatedEvent from "./customer-created.event";

describe("Customer events test", () => {

    let eventDispatcher: EventDispatcher;

    describe("Customer Created", () => {
        beforeEach(() => {
            eventDispatcher = new EventDispatcher();
        })

        // tslint:disable:no-string-literal
        describe("notify", () => {
            it("should notify all handlers", () => {
                const firstEventHandler = new LogCustomerCreatedHandler(1);
                const secondEventHandler = new LogCustomerCreatedHandler(2);

                const spyOne = jest.spyOn(firstEventHandler, "handle")
                const spyTwo = jest.spyOn(secondEventHandler, "handle")

                eventDispatcher.register("CustomerCreatedEvent", firstEventHandler)
                eventDispatcher.register("CustomerCreatedEvent", secondEventHandler)

                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)

                const event = new CustomerCreatedEvent({name: "Fulano de tal", email: "any_email@mail.com"});

                eventDispatcher.notify(event)

                expect(spyOne).toHaveBeenCalled()
                expect(spyTwo).toHaveBeenCalled()

            })
        })

        describe("register", () => {

            it("should register an event handler", () => {
                const eventHandler = new LogCustomerCreatedHandler(1);

                eventDispatcher.register("CustomerCreatedEvent", eventHandler)

                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1)

                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler)
            })

        })

        describe("unregister", () => {
            it("should unregister an event handler", () => {
                const eventHandler = new LogCustomerCreatedHandler(1);

                eventDispatcher.register("CustomerCreatedEvent", eventHandler)
                eventDispatcher.register("CustomerCreatedEvent", new LogCustomerCreatedHandler(2))

                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)

                eventDispatcher.unregister("CustomerCreatedEvent", eventHandler)
                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1)
            })
        })

        describe("unregisterAll", () => {
            it("should unregister all event handlers", () => {
                const eventHandler = new LogCustomerCreatedHandler(1);

                eventDispatcher.register("CustomerCreatedEvent", eventHandler)
                eventDispatcher.register("CustomerCreatedEvent", new LogCustomerCreatedHandler(2))

                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)

                eventDispatcher.unregisterAll();

                expect(eventDispatcher.getEventHandlers).toBeFalsy()
            })
        })
    })


    describe("Address Changed", () => {
        beforeEach(() => {
            eventDispatcher = new EventDispatcher();
        })

        // tslint:disable:no-string-literal
        describe("notify", () => {
            it("should notify all handlers", () => {
                const eventHandler = new SendEmailWhenProductCreatedHandler();
                const spy = jest.spyOn(eventHandler, "handle")

                eventDispatcher.register("ProductCreatedEvent", eventHandler)

                expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

                const event = new ProductCreatedEvent({name: "Product 1", email: "any_email@mail.com"});

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
})