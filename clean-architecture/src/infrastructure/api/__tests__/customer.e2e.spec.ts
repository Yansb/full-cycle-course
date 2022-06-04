import {app, sequelize} from "../express"
import request from "supertest"

describe("E2E test for customer", () => {

  beforeEach(async () => {
    await sequelize.sync({force: true})
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          city: "Anytown",
          number: 123,
          zip: "12345"
        },
      });

    expect(response.status).toBe(201)
    expect(response.body.name).toBe("John Doe")
    expect(response.body.address.street).toBe("123 Main St")
  })

  it("should not create a customer", async () => {
    const response = await request(app)
    .post("/customer")
    .send({
      name: "John Doe",
    });

    expect(response.status).toBe(500)
  })

  it("should get all customers", async () => {
    await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          city: "Anytown",
          number: 123,
          zip: "12345"
        },
      });

    await request(app)
      .post("/customer")
      .send({
        name: "Jane Doe",
        address: {
          street: "456 Main St",
          city: "Anytown",
          number: 456,
          zip: "12345"
        },
      });

    const response = await request(app).get("/customer")
    expect(response.status).toBe(200)
    expect(response.body.customers.length).toBe(2)
    expect(response.body.customers[0].name).toBe("John Doe")
    expect(response.body.customers[1].name).toBe("Jane Doe")
    expect(response.body.customers[0].address.street).toBe("123 Main St")
    expect(response.body.customers[1].address.street).toBe("456 Main St")

    const listResponseXML = await request(app)
    .get("/customer")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(listResponseXML.text).toContain(`<customers>`)
    expect(listResponseXML.text).toContain(`<name>John Doe</name>`)
    expect(listResponseXML.text).toContain(`<name>Jane Doe</name>`)
    expect(listResponseXML.text).toContain(`<address>`)
    expect(listResponseXML.text).toContain(`<street>123 Main St</street>`)
  })

})