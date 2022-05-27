import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export class FindCostumerUseCase{
  constructor(private customerRepository: CustomerRepositoryInterface){}
  
  async execute({id}: InputFindCustomerDto): Promise<OutputFindCustomerDto>{
    const customer = await this.customerRepository.find(id);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city
      }
    }
  }
}