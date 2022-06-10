import { AggregateRoot } from "../../@shared/domain/entity/aggregate-root.interface";
import { BaseEntity } from "../../@shared/domain/entity/base.entity"
import { Id } from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends BaseEntity implements AggregateRoot {

  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _stock: number;


  constructor(props: ProductProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
    this._stock = props.stock;
  }

  get name(): string{
    return this._name;
  }

  get description(): string{
    return this._description
  }

  get purchasePrice(): number{
    return this._purchasePrice
  }

  get stock(): number{
    return this._stock
  }

}