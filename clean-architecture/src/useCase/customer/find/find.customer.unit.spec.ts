import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { FindCostumerUseCase } from "./find.customer.usecase";

const MockRepository = () => {
  const customer = new Customer("1", "John");
  const address = new Address("street", 1, "zipcode 1", "city 1");
  customer.changeAddress(address);

  return{
    find: jest.fn().mockReturnValue(customer),
    findAll: jest.fn(),
    create:  jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test Find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCostumerUseCase(customerRepository)

    const customer = new Customer("1", "John");
    const address = new Address("street", 1, "zipcode 1", "city 1");
    customer.changeAddress(address);
    
    await customerRepository.create(customer);

    const input = {
      id: '1'
    }

    const output = {
      id: '1',
      name: 'John',
      address: {
        street: 'street',
        number: 1,
        zip: 'zipcode 1',
        city: 'city 1'
      }
    }

    const result = await useCase.execute(input);

    expect(result).toStrictEqual(output);

  })

  it("should throw error if dont find customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found")
    })
    const useCase = new FindCostumerUseCase(customerRepository)

    const input = {
      id: '1'
    }

   expect(async () => {
     return useCase.execute(input)
   }).rejects.toThrow("Customer not found")

  })
})