import { OrderItem } from "./ordem_item";

export class Order{ 
  _id: string;
  _customerId: string;
  _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]){
    this._id = id;
    this._customerId = customerId;
    this._items = items;
  }

}