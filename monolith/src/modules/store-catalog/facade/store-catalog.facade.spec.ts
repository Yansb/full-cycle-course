import { Sequelize } from "sequelize-typescript";
import { StoreCatalogFacadeFactory } from "../factory/store-catalog.facade.factory";
import { ProductModel } from "../repository/product.model";

describe("Store catalog facade", () => {
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

  it("should find a product", async () => {
    const facade = StoreCatalogFacadeFactory.create();

    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    })

    const result = await facade.find({id: "1"});

    expect(result.id).toBe("1");
    expect(result.name).toBe("Product 1");
    expect(result.description).toBe("Description 1");
    expect(result.salesPrice).toBe(100);

  })
})