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

  it("should create product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Product 1",
        price: 123,
        type: "a"
      });

    expect(response.status).toBe(201)
    expect(response.body.name).toBe("Product 1")
    expect(response.body.price).toBe(123)
  })

  it("should return error 500 ", async () => {
    const response = await request(app)
    .post("/product")
    .send({
      name: "Product 1",
    });

    expect(response.status).toBe(500)
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

    expect(response.status).toBe(200)
    expect(response.body).toBeDefined()
    expect(response.body.products.length).toBe(2)
    expect(response.body.products[0].name).toBe("Product 1")
    expect(response.body.products[1].name).toBe("Product 2")
  })
})