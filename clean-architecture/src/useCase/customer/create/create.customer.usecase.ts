import { CustomerFactory } from "../../../domain/customer/factory/customer.factory";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import { Address } from "../../../domain/customer/value-object/address";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";

export class CreateCustomerUseCase{
  constructor(private customerRepository: CustomerRepositoryInterface){}

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto>{
    const customer = CustomerFactory.createWithAddress(input.name, new Address(input.address.street, input.address.number, input.address.zip, input.address.city));

    await this.customerRepository.create(customer);

    return {
      address:{
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city
      },
      id: customer.id,
      name: customer.name
    }
  }
}