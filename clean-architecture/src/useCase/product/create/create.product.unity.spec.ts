import { InputCreateProductDto } from "./create.product.dto"
import { CreateProductUseCase } from "./create.product.usecase"

const input: InputCreateProductDto ={
  name: "Product 1",
  price: 25.99,
  type: "a"
}

const MockRepository = () => {
  return{
    find: jest.fn(),
    findAll: jest.fn(),
    create:  jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price	
    })
  })
})