import { OrderItem } from "../entity/ordem_item";
import { Order } from "../entity/order";

interface OrderItemProps{
  id: string;
  name: string;
  productId: string;
  quantity: number;
  price: number;
}

interface OrderFactoryProps{
  id: string;
  customerId: string;
  items: OrderItemProps[];
}

export class OrderFactory{
  static create(orderProps: OrderFactoryProps): Order{
    const orderItems = orderProps.items.map(item => {
      return new OrderItem(item.id, item.name, item.price, item.productId, item.quantity);
    })
   
    return new Order(orderProps.id, orderProps.customerId, orderItems);
  }
}