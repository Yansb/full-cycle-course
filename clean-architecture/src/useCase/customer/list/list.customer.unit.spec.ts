import { CustomerFactory } from "../../../domain/customer/factory/customer.factory"
import { Address } from "../../../domain/customer/value-object/address"
import { ListCustomerUseCase } from "./list.customer.usecase"

const customer1 = CustomerFactory.createWithAddress("John", new Address("Rua 1", 2, "zipcode 1", "city 1"))
const customer2 = CustomerFactory.createWithAddress("Jane", new Address("Rua 2", 3, "zipcode 2", "city 2"))

const MockRepository = () => {
  return{
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([customer1, customer2]),
    create:  jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test list customer use case", () => {
  it("should list customers", async () => {
    const customerRepository = MockRepository();
    const useCase = new ListCustomerUseCase(customerRepository);

    const output = await useCase.execute({});

    expect(output.customers).toHaveLength(2)
    expect(output.customers[0].address.street).toEqual(customer1.address.street)
    expect(output.customers[1].address.street).toEqual(customer2.address.street)
  })

})