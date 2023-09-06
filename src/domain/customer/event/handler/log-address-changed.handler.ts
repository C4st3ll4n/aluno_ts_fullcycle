import EventHandlerInterface from "../../../shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class LogAddressChangedHandler implements EventHandlerInterface<CustomerAddressChangedEvent>{
    // tslint:disable:no-console
    handle(event: CustomerAddressChangedEvent): void {
        const _data = event.eventData;
        console.log(`Endereço do cliente: ${_data.id}, ${_data.nome} alterado para ${_data.endereco}`);
    }

}