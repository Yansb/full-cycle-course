import { Address } from "./entity/address";
import { Customer } from "./entity/customer";
import { OrderItem } from "./entity/ordem_item";
import { Order } from "./entity/order";

let customer = new Customer("123", "Yan Santana");
const address = new Address("Rua B", 140, "44444-444", "Salvador")
customer.Address = address
customer.activate();


const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);
const order = new Order("1", "123", [item1, item2]);