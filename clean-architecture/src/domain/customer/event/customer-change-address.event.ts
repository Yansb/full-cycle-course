import { EventInterface } from "../../@shared/event/event.interface";
import { Address } from "../value-object/address";

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