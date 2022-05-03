import { OrderItem } from "./ordem_item"
import { Order } from "./order"

describe("Order unit tests", () => {
  
 it("should throw error when id is empty", () => {
   expect(() => {let order = new Order("", "123", [])})
   .toThrowError("Id is required");
 })

 it("should throw error when customer id is empty", () => {
    expect(() => {let order = new Order("123", "", [])})
    .toThrowError("Customer id is required");
 })

 it("should throw error if items is empty", () => {
   expect(() => {
      let order = new Order("123", "123", [])

   }).toThrowError("Item quantity must be greater than 0")
 })

 it("should calculate total", () => {
   const item1 = new OrderItem("i1", "Item 1", 100, "p1", 2)
   const item2 = new OrderItem("i2", "Item 2", 200, "p2", 3)

   const order= new Order("123", "123", [item1])

   expect(order.total()).toBe(200)

   const order2 = new Order("123", "123", [item1, item2])

   expect(order2.total()).toBe(800)
 })
 it("should throw error if item quantity is greater than 0", () => {
   
   expect(() => {
     const item = new OrderItem("i1", "Item 1", 100, "p1", 0)
     const order= new Order("123", "123", [item])
   }).toThrowError("Quantity must be greater than 0")

 })

})