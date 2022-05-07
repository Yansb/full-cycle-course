import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../../domain/customer/value-object/address";
import { CustomerModel } from "./customer.model";

export class CustomerRepository implements CustomerRepositoryInterface{
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipcode,
      city: entity.address.city
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update({
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipcode,
      city: entity.address.city
      },{
      where:{
        id: entity.id
      }
    });
  }
  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel =  await CustomerModel.findOne({where: {id}, rejectOnEmpty: true});
    } catch (error) {
      throw new Error("Customer not found")
    }
    const customer = new Customer(customerModel.id, customerModel.name);
    customer.Address = new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city);

    return customer;
  }
  
  async findAll(): Promise<Customer[]> {
    const customerModel = await CustomerModel.findAll();

    return customerModel.map(customerModel =>{ 
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      customer.changeAddress(new Address(customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city))
      return customer;
    });
  }

}