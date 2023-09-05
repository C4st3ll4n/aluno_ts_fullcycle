import EventHandlerInterface from "../../shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";
import * as console from "console";

export default class LogCustomerCreatedHandler implements EventHandlerInterface<CustomerCreatedEvent>{


    constructor(private readonly index:number) {}

    // tslint:disable:no-console
    handle(event: CustomerCreatedEvent): void {
        console.log(`Essa é a ${this.index}ª logger do evento: ${event.constructor.name}`)
    }

}