import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model"
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository"
import { InputCreateProductDto } from "./create.product.dto"
import { CreateProductUseCase } from "./create.product.usecase"

const input: InputCreateProductDto ={
  name: "Product 1",
  price: 25.99,
  type: "a"
}

describe("Integrated test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true}
    })
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async() => {
    await sequelize.close()
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price	
    })
  })
})