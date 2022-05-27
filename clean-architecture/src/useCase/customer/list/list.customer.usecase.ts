import { Customer } from "../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../domain/customer/repository/customer-repository.interface";
import { InputListCustomerDto, OutputListCustomerDto } from "./list.customer.dto";

export class ListCustomerUseCase {
  constructor(private customerRepository: CustomerRepositoryInterface){}

  async execute(input: InputListCustomerDto): Promise<OutputListCustomerDto> {

    const customers = await this.customerRepository.findAll();
    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput(customer: Customer[]): OutputListCustomerDto{
    return {
      customers: customer.map(c => ({
        id: c.id,
        name: c.name,
        address: {
          street: c.address.street,
          number: c.address.number,
          zip: c.address.zip,
          city: c.address.city
        }
      }))
    }
  }
}