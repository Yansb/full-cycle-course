import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import { CustomerModel } from "../../../infrastructure/customer/repository/sequelize/customer.model";
import { CustomerRepository } from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { FindCostumerUseCase } from "./find.customer.usecase";

describe("Integrated test Find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true}
    })
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async() => {
    await sequelize.close()
  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
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
    const customerRepository = new CustomerRepository();
    const useCase = new FindCostumerUseCase(customerRepository)

    const input = {
      id: '1'
    }

    await expect(useCase.execute(input)).rejects.toEqual(new Error("Customer not found"));

  })
})