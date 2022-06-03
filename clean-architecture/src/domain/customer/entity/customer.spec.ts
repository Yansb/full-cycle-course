import { Address } from "../value-object/address"
import { Customer } from "./customer"

describe("Customer unit tests", () => {
  
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John")
    }).toThrowError("customer: Id is required")
  })
  
  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "")
    }).toThrowError("customer: Name is required")
  })
  it("should throw error when id and name is empty", () => {
    expect(() => {
      let customer = new Customer("", "")
    }).toThrowError("customer: Id is required,customer: Name is required")
  })

  it("should change name", () => {
    const customer = new Customer("123", "John")
    customer.changeName("Jane")

    expect(customer.name).toBe("Jane")
  })

  it("should activate customer", () => {
    const customer = new Customer("123", "John")

    const address = new Address("street1", 2, "4040400", "Salvador")
    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)

  })

  it("should throw error when address is undefined", () => {
    const customer = new Customer("123", "John")

    

    expect(() => customer.activate()).toThrow("Address is required")

  })
  
  it("should deactivate customer", () => {
    const customer = new Customer("123", "John")

    const address = new Address("street1", 2, "4040400", "Salvador")
    customer.Address = address

    customer.activate()

    expect(customer.isActive()).toBe(true)
    
    customer.deactivate()

    expect(customer.isActive()).toBe(false)

  })

  it("should add reward points", ()=> {
    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
   
    customer.addRewardPoints(20)
    expect(customer.rewardPoints).toBe(30)
  })
})