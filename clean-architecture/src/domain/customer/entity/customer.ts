import Entity from "../../@shared/entity/entity.abstract";
import { NotificationError } from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import { Address } from "../value-object/address";

export class Customer extends Entity {
  _name: string
  _address!: Address;
  _active: boolean = false
  private _rewardPoints = 0;

  constructor(id: string, name: string){
    super();
    this._id = id
    this._name = name
    this.validate();
    
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  } 

  get name(): string{
    return this._name
  }

  get rewardPoints(): number{
    return this._rewardPoints
  }

  get address(): Address{
    return this._address
  }

  isActive(): boolean{
    return this._active
  }
 
  validate(){
    CustomerValidatorFactory.create().validate(this)
  }

  changeName(name: string){
    this._name = name
    this.validate()
  }

  changeAddress(address: Address){
    this._address = address
  }

  activate(){
    if(this._address === undefined){
      throw new Error("Address is required")
    }

    this._active = true
  }

  deactivate(){
    this._active = false
  }

  addRewardPoints(points: number){
    this._rewardPoints += points
  }

  set Address(address: Address){
    this._address = address
  }
}