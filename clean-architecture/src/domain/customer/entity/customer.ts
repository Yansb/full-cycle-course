import { Address } from "../value-object/address";

export class Customer {
  _id: string
  _name: string
  _address!: Address;
  _active: boolean = false
  private _rewardPoints = 0;

  constructor(id: string, name: string){
    this._id = id,
    this._name = name
    this.validate();
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

  get id(): string{
    return this._id
  }

  isActive(): boolean{
    return this._active
  }
 
  validate(){
    if(this._id.length === 0){
      throw new Error("Id is required")
    }
    if(this._name.length === 0){
      throw new Error("Name is required")
    }
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