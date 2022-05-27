import { ProductFactory } from "../../../domain/product/factory/product.factory"
import { ListProductUseCase } from "./list.product.usecase"

const product1 = ProductFactory.create("a","Product 1", 35.5)
const product2 = ProductFactory.create("a", "Product 2", 30.0)

const MockRepository = () => {
  return{
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([product1, product2]),
    create:  jest.fn(),
    update: jest.fn(),
  }
}

describe("Unit test list customer use case", () => {
  it("should list customers", async () => {
    const customerRepository = MockRepository();
    const useCase = new ListProductUseCase(customerRepository);

    const output = await useCase.execute({});

    expect(output.products).toHaveLength(2)
    expect(output.products[0].name).toEqual(product1.name)
    expect(output.products[1].name).toEqual(product2.name)
  })

})