import { AddProductInputDto } from "./add-product.dto"
import { AddProductUseCase } from "./add-product.useCase"

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe("Add product useCase unit test", () => {
  it("should add a product", async () => {
    const productRepository = MockRepository()
    const useCase = new AddProductUseCase(productRepository);

    const input: AddProductInputDto = {
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    }

    const result = await useCase.execute(input);

    expect(productRepository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.description).toBe(input.description)
    expect(result.purchasePrice).toBe(input.purchasePrice)
    expect(result.stock).toBe(input.stock)

  })
})