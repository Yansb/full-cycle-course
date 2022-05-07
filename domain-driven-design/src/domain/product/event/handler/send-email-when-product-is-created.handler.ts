import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent>{
  handle(event: ProductCreatedEvent): void {
    console.log("Sending email to user...")
  }

}