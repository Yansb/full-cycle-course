export interface EventInterface<T=any> {
  dateTimeOcurred: Date;
  eventData: T;
}