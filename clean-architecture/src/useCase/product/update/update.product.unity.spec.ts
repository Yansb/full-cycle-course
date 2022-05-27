import { ProductFactory } from "../../../domain/product/factory/product.factory"
import { InputUpdateProductDto } from "./update.product.dto"
import { UpdateProductUseCase } from "./update.product.usecase"

const product = ProductFactory.create("a", "Product 1", 25.99)

const input: InputUpdateProductDto ={
  name: "Product updated",
  id: "1",
  price: 30.00,
}

const MockRepository = () => {
  return{
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create:  jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test update product use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input)
  })
})