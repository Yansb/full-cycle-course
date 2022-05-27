import { v4 as uuid } from "uuid";
import { Product } from "../entity/product";
import { ProductB } from "../entity/product-b";
import { ProductInterface } from "../entity/product.interface";

export class ProductFactory {
  static create(type: "a" | "b",name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "b":
        return new ProductB(uuid(), name, price);
      default:
        throw new Error("Product type not found");
    }
  }
}