import { Address } from "../../entity/address";
import { EventInterface } from "../@shared/event.interface";

interface ICustomerChangeAddressEvent {
  id: string;
  name: string;
  address: Address;
}

export class CustomerChangedAddressEvent implements EventInterface<ICustomerChangeAddressEvent> {
  dateTimeOcurred: Date;
  eventData: ICustomerChangeAddressEvent;

  constructor(eventData: ICustomerChangeAddressEvent) {
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}