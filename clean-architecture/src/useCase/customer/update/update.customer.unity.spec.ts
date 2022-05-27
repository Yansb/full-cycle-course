import { CustomerFactory } from "../../../domain/customer/factory/customer.factory"
import { Address } from "../../../domain/customer/value-object/address"
import { UpdateCustomerUseCase } from "./update.customer.usecase"

const customer = CustomerFactory.createWithAddress("John", new Address("Rua 1", 2, "zipcode 1", "city 1"))

const input ={
  id: customer.id,
  name: "John updated",
  address: {
    street: "street updated",
    number: 2,
    zip: "zipcode updated",
    city: "city updated"
  }
}

const MockRepository = () => {
  return{
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create:  jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test update customer use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new UpdateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input)
  })

})