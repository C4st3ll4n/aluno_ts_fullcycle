import EventHandlerInterface from "../../shared/event-handler.interface";

export default class LogAddressChangedHandler implements EventHandlerInterface<CustomerChangeAddressEvent>{
    handle(event: CustomerChangeAddressEvent): void {
    }

}