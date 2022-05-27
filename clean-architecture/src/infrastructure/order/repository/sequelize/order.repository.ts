import { OrderItem } from "../../../../domain/checkout/entity/ordem_item";
import { Order } from "../../../../domain/checkout/entity/order";
import { OrderRepositoryInterface } from "../../../../domain/checkout/repository/order-repository.interface";
import { OrderItemModel } from "./order-items.model";
import { OrderModel } from "./order.model";


export class OrderRepository implements OrderRepositoryInterface{
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customer_id,
      total: entity.total(),
      items: entity.items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
      }))
    },
    {
      include: [{model: OrderItemModel}]
    })
  }
  async update(entity: Order): Promise<void> {
    const sequelize = OrderModel.sequelize;
    await sequelize.transaction(async (t) => {
      await OrderItemModel.destroy({
        where: { order_id: entity.id },
        transaction: t,
      });
      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        order_id: entity.id,
      }));
      await OrderItemModel.bulkCreate(items, { transaction: t });
      await OrderModel.update(
        { total: entity.total() },
        { where: { id: entity.id }, transaction: t }
      );
    });
  }
  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({where: {id}, include: ["items"]})

    const items = orderModel.items.map(item => new OrderItem(
      item.id, 
      item.name, 
      item.price, 
      item.product_id, 
      item.quantity
      ));

    const order = new Order(orderModel.id, orderModel.customer_id,items);
    return order
  }

  async findAll(): Promise<Order[]> {
    const orderModel = await OrderModel.findAll({include: ["items"]})

    return orderModel.map(order => {
      const items = order.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ));

      return new Order(order.id, order.customer_id, items);
    })
  }



}