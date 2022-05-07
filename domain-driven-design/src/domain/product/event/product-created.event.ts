import { EventInterface } from "../../@shared/event/event.interface";

export class ProductCreatedEvent implements EventInterface{
  dateTimeOcurred: Date;
  eventData: any;

  constructor(eventData: any){
    this.dateTimeOcurred = new Date();
    this.eventData = eventData;
  }
}