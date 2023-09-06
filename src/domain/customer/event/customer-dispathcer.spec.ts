import EventDispatcher from "../../shared/event/event-dispatcher";
import LogCustomerCreatedHandler from "./handler/log-customer-created.handler";
import CustomerCreatedEvent from "./customer-created.event";
import LogAddressChangedHandler from "./handler/log-address-changed.handler";
import CustomerAddressChangedEvent from "./customer-address-changed.event";

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
                const eventHandler = new LogAddressChangedHandler();
                const spy = jest.spyOn(eventHandler, "handle")

                eventDispatcher.register("CustomerAddressChangedEvent", eventHandler)

                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1)

                const event = new CustomerAddressChangedEvent({
                    id:"1", nome:"Pedro", endereco:"Rua do Fulano 40028922"
                });

                eventDispatcher.notify(event)

                expect(spy).toHaveBeenCalled()

            })
        })

        describe("register", () => {

            it("should register an event handler", () => {
                const eventHandler = new LogAddressChangedHandler();

                eventDispatcher.register("CustomerAddressChangedEvent", eventHandler)

                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1)

                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandler)
            })

        })

        describe("unregister", () => {
            it("should unregister an event handler", () => {
                const eventHandler = new LogAddressChangedHandler();

                eventDispatcher.register("CustomerAddressChangedEvent", eventHandler)
                eventDispatcher.register("CustomerAddressChangedEvent", new LogAddressChangedHandler())

                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(2)

                eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler)
                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1)
            })
        })

        describe("unregisterAll", () => {
            it("should unregister all event handlers", () => {
                const eventHandler = new LogAddressChangedHandler();

                eventDispatcher.register("CustomerAddressChangedEvent", eventHandler)
                eventDispatcher.register("CustomerAddressChangedEvent", new LogAddressChangedHandler())

                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]).toBeDefined()
                expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(2)

                eventDispatcher.unregisterAll();

                expect(eventDispatcher.getEventHandlers).toBeFalsy()
            })
        })
    })
})