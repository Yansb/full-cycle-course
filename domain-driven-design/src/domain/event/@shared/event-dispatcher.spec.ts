import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../product/product-created.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {

  it("should register event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler).toHaveProperty("ProductCreatedEvent");
    expect(eventDispatcher.getEventsHandler.ProductCreatedEvent.length).toBe(1);
    expect(eventDispatcher.getEventsHandler.ProductCreatedEvent[0]).toMatchObject(eventHandler);
    
  })

  it("should unregister event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler.ProductCreatedEvent[0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler).toHaveProperty("ProductCreatedEvent");
    expect(eventDispatcher.getEventsHandler.ProductCreatedEvent.length).toBe(0);

  })

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler.ProductCreatedEvent[0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventsHandler["ProductCreatedEvent"]).toBeUndefined();

  })

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler.ProductCreatedEvent[0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 100
    });

    //Quando o notify for executado o send email when product is created handler deve ser executado
    eventDispatcher.notify(productCreatedEvent)
    
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);

  })
})