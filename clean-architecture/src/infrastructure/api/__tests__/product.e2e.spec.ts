import { app, sequelize } from "../express"
import request from "supertest"
import { InputCreateProductDto } from "../../../useCase/product/create/create.product.dto"

describe("E2E test for customer", () => {

  beforeEach(async () => {
    await sequelize.sync({force: true})
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should list products", async () => {
    await request(app)
    .post("/product")
    .send({
      name: "Product 1",
      price: 100,
      type: "a"
    } as InputCreateProductDto)
    
    await request(app)
    .post("/product")
    .send({
      name: "Product 2",
      price: 25.5,
      type: "a"
    } as InputCreateProductDto)

    const response = await request(app)
    .get("/product")

    console.log(response.body)
    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.products.length).toBe(2)
    expect(response.body.products[0].name).toBe("Product 1")
    expect(response.body.products[1].name).toBe("Product 2")
  })
})