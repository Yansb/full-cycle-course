import { CustomerChangedAddressEvent } from "../../customer/event/customer-change-address.event";
import { CustomerCreatedEvent } from "../../customer/event/customer-created.event";
import { ConsoleWhenChangeAddressHandler } from "../../customer/event/handler/console-when-change-address.handler";
import { EnviaConsoleLog1Handler } from "../../customer/event/handler/envia-console-log1.handler";
import { EnviaConsoleLog2Handler } from "../../customer/event/handler/envia-console-log2.handler";
import { Address } from "../../customer/value-object/address";
import { SendEmailWhenProductIsCreatedHandler } from "../../product/event/handler/send-email-when-product-is-created.handler";
import { ProductCreatedEvent } from "../../product/event/product-created.event";
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
    const consoleHandler = new EnviaConsoleLog1Handler();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler)
    eventDispatcher.register("CustomerCreatedEvent", consoleHandler)

    expect(eventDispatcher.getEventsHandler.ProductCreatedEvent[0]).toMatchObject(eventHandler);
    expect(eventDispatcher.getEventsHandler.CustomerCreatedEvent[0]).toMatchObject(consoleHandler);

    eventDispatcher.unregisterAll()

    expect(eventDispatcher.getEventsHandler["ProductCreatedEvent"]).toBeUndefined();
    expect(eventDispatcher.getEventsHandler["CustomerCreatedEvent"]).toBeUndefined()

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

  it("should register customer handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler).toHaveProperty("CustomerCreatedEvent");
    expect(eventDispatcher.getEventsHandler.CustomerCreatedEvent.length).toBe(1);
    expect(eventDispatcher.getEventsHandler.CustomerCreatedEvent[0]).toMatchObject(eventHandler);
  })
  
  it("should unregister customer handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler.CustomerCreatedEvent[0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("CustomerCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler.CustomerCreatedEvent.length).toBe(0);
    expect(eventDispatcher.getEventsHandler.CustomerCreatedEvent[0]).toBeUndefined();
  })

  it("should notify customer created event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler)
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2)

    expect(eventDispatcher.getEventsHandler.CustomerCreatedEvent[0]).toMatchObject(eventHandler);

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: 1,
      name: "Customer 1",
      active: false,
    });

    console.log(eventDispatcher.getEventsHandler.CustomerCreatedEvent[0])
    eventDispatcher.notify(customerCreatedEvent)

    
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    expect(spyEventHandler).toHaveBeenCalledWith(customerCreatedEvent);
    expect(spyEventHandler2).toHaveBeenCalledTimes(1);
    expect(spyEventHandler2).toHaveBeenCalledWith(customerCreatedEvent);
  })
  



  it("should notify customer changed address handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new ConsoleWhenChangeAddressHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler)

    expect(eventDispatcher.getEventsHandler.CustomerChangedAddressEvent[0]).toMatchObject(eventHandler);

    console.log(eventDispatcher.getEventsHandler.CustomerChangedAddressEvent[0])

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      id: "1",
      name: "Customer 1",
      address: new Address("Rua 1", 123, "zipcode 1", "city 1")
    });

    eventDispatcher.notify(customerChangedAddressEvent)
    
    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    expect(spyEventHandler).toHaveBeenCalledWith(customerChangedAddressEvent);
  })
})