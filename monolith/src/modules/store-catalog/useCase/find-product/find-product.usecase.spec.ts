import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { Product } from "../../domain/product.entity"
import { FindProductUseCase } from "./find-product.usecase"

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 1
})

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}

describe("Find product store use case", () => {
  it("should find product", async () => {
    const repository = MockRepository()
    const useCase = new FindProductUseCase(repository)
    const result = await useCase.execute({ id: "1" })

    expect(result).toEqual({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 1
    })
    expect(repository.find).toHaveBeenCalledWith("1")
  })
})