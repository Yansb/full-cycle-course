import { Customer } from "../../customer/entity/customer"
import { OrderItem } from "../entity/ordem_item"
import { Order } from "../entity/order"
import {OrderService} from "./order.service"

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("c1", "John doe")

    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1)
    
    const order = OrderService.placeOrder(customer, [item1])

    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })

  it("should get total of all orders", () => {
    const item1 = new OrderItem("1", "item 1", 10, "5", 1)	
    const item2 = new OrderItem("2", "item 2", 20, "6", 1)
   
    const order1 = new Order("1", "123", [item1, item2] )
    const order2 = new Order("2", "123", [item2])

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(50);

  })
})