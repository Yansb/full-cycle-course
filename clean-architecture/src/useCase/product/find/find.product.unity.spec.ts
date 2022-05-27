import { ProductFactory } from "../../../domain/product/factory/product.factory"
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto"
import { FindProductUseCase } from "./find.product.usecase"

const product = ProductFactory.create("a", "Product 1", 25.99)

const input: InputFindProductDto ={
  id: "1",
}
const expectedOutput: OutputFindProductDto ={
  id: product.id,
  name: product.name,
  price: product.price,
}

const MockRepository = () => {
  return{
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create:  jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockRepository();
    const useCase = new FindProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual(expectedOutput)
  })
})