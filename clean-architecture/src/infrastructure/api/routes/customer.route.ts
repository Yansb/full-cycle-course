import express, {Request, Response} from "express";
import { InputCreateCustomerDto } from "../../../useCase/customer/create/create.customer.dto";
import { CreateCustomerUseCase } from "../../../useCase/customer/create/create.customer.usecase";
import { ListCustomerUseCase } from "../../../useCase/customer/list/list.customer.usecase";
import { CustomerRepository } from "../../customer/repository/sequelize/customer.repository";
import CustomerPresenter from "../presenters/customer.presenter";

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository())
  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zip: req.body.address.zip
      }
    }

    const output = await useCase.execute(customerDto)
    res.status(201).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

customerRoute.get('/', async (_: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository())
  const output = await useCase.execute({})
  res.format({
    json: async () => res.send(output),
    xml: async () => res.send(CustomerPresenter.toXML(output)),
  })
})