import { Sequelize } from "sequelize-typescript";
import { ProductAdmFacadeFactory } from "../factory/facade.factory";
import { ProductModel } from "../repository/product.model";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../useCase/add-product/add-product.useCase";
import { ProductAdmFacade } from "./product-adm.facade";
import { AddProductFacadeInputDto } from "./product-adm.facade.interface";

describe("ProductFacadeAdmTest", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a product", async () => {
    const productRepository = new ProductRepository()

    const productFacade = ProductAdmFacadeFactory.create()

    const input: AddProductFacadeInputDto = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 1,
      stock: 10,
    }

    await productFacade.addProduct(input)

    const product = await productRepository.find(input.id)

    expect(product.id.id).toEqual(input.id)
    expect(product.name).toEqual(input.name)
    expect(product.description).toEqual(input.description)
  })

  it("should check stock from product", async () => {
    const productRepository = new ProductRepository()

    const productFacade = ProductAdmFacadeFactory.create()

    const input: AddProductFacadeInputDto = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 1,
      stock: 10,
    }

    await productFacade.addProduct(input)

    const stock = await productFacade.checkStock({
      productId: input.id
    })

    expect(stock.productId).toEqual("1")
    expect(stock.stock).toEqual(10)


  })

})