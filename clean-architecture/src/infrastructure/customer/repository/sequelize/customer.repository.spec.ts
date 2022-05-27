import {Sequelize} from "sequelize-typescript";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Address } from "../../../../domain/customer/value-object/address";
import { CustomerModel } from "./customer.model";
import { CustomerRepository } from "./customer.repository";

describe("Customer repository test", () => {
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

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John");
    const address = new Address("street", 1, "zipcode 1", "city 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: "1"}});
    
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    });
  })

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John");
    const address = new Address("street", 1, "zipcode 1", "city 1");
    customer.Address = address;
    await customerRepository.create(customer);  
    
    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({where: {id: "1"}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city
    });
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John");
    const address = new Address("street", 1, "zipcode 1", "city 1");
    customer.Address = address;
    await customerRepository.create(customer);  

    const customerResult = await customerRepository.find("1");

    expect(customer).toStrictEqual(customerResult);
  })
  
  it("should throw error when customer is not found", async () => {  
    const customerRepository = new CustomerRepository();


    expect(async() => {
      await customerRepository.find("1");
    }).rejects.toThrow("Customer not found");
  })

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "John");
    const address = new Address("street", 1, "zipcode 1", "city 1");
    customer.Address = address;
    await customerRepository.create(customer);  

    const customer2 = new Customer("2", "John");
    const address2 = new Address("street", 2, "zipcode 2", "city 2");
    customer2.Address = address2;
    await customerRepository.create(customer2); 

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer, customer2];

    expect(foundCustomers).toHaveLength(2);
    expect(foundCustomers).toEqual(customers);
    
  })

})