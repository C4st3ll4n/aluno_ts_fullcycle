import EventHandlerInterface from "../../../shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export class SendEmailWhenProductCreatedHandler implements  EventHandlerInterface<ProductCreatedEvent>{
    handle(event: ProductCreatedEvent): void {
        // tslint:disable:no-console
        console.log(`Sending email to ${event.eventData.email}...`)
        const _success = Math.random()
        if(_success===1){
            console.log("Email sent successfully")
        }else{
            console.log("Fail to send email")
        }
    }
}
