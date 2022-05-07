import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

export class EventDispatcher implements EventDispatcherInterface{
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};


  get getEventsHandler(): { [eventName: string]: EventHandlerInterface[] }{
    return this.eventHandlers;
  } 

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if(this.eventHandlers[eventName]){
      this.eventHandlers[eventName].forEach(eventHandler => {
        eventHandler.handle(event);
      })
    }
  }

  register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    	if (!this.eventHandlers[eventName]) {
        this.eventHandlers[eventName] = [];
      }

      this.eventHandlers[eventName].push(eventHandler);
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
    if (!this.eventHandlers[eventName]) {
      throw new Error(`${eventName} event does not exist.`);
    }

    const index = this.eventHandlers[eventName].indexOf(eventHandler);
    if (index !== -1){
      this.eventHandlers[eventName].splice(index, 1);
    }else{
      throw new Error(`${eventName} event handler not registered.`);
    }
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }

}