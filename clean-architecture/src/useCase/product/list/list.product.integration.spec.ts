import { Sequelize } from "sequelize-typescript"
import { Product } from "../../../domain/product/entity/product"
import { ProductModel } from "../../../infrastructure/product/repository/sequelize/product.model"
import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository"
import { ListProductUseCase } from "./list.product.usecase"

describe("Integration test list customer use case", () => {
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

  it("should list products", async () => {
    const product1 = new Product("1", "Product 1", 25.99)
    const product2 = new Product("2", "Product 2", 25.99)
    
    const productRepository = new ProductRepository();
    productRepository.create(product1)
    productRepository.create(product2)

    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output.products).toHaveLength(2)
    expect(output.products[0].name).toEqual(product1.name)
    expect(output.products[1].name).toEqual(product2.name)
  })

})