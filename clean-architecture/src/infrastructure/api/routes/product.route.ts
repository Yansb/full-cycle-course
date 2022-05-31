import express, { Request, Response } from "express";
import { InputCreateProductDto } from "../../../useCase/product/create/create.product.dto";
import { CreateProductUseCase } from "../../../useCase/product/create/create.product.usecase";
import { ListProductUseCase } from "../../../useCase/product/list/list.product.usecase";
import { ProductRepository } from "../../product/repository/sequelize/product.repository";


export const productRoute = express.Router();

productRoute.get('/', async (_, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository)
  
  try {
    const output = await useCase.execute({})
    res.status(200).send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository())
  const productDto:InputCreateProductDto = {
    name: req.body.name,
    price: req.body.price,
    type: req.body.type
  }
  try {
    const output = await useCase.execute(productDto)
    return res.status(201).send(output)
  } catch (error) {
    return res.status(500).send(error)
  }
})