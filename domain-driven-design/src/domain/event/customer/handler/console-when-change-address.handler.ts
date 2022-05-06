import { EventHandlerInterface } from "../../@shared/event-handler.interface";
import { CustomerChangedAddressEvent } from "../customer-change-address.event";

export class ConsoleWhenChangeAddressHandler implements EventHandlerInterface<CustomerChangedAddressEvent> {
  handle(event: CustomerChangedAddressEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: `);
  }

}