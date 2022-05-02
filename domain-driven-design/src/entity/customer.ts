import { Address } from "./address";

export class Customer {
  _id: string
  _name: string
  _address!: Address;
  _active: boolean = false

  constructor(id: string, name: string){
    this._id = id,
    this._name = name
    this.validate();
  } 

  validate(){
    if(this._name.length === 0){
      throw new Error("Name is required")
    }
    if(this._id.length === 0){
      throw new Error("Id is required")
    }
  }

  changeName(name: string){
    this._name = name
    this.validate()
  }

  activate(){
    if(this._address === undefined){
      throw new Error("Address is required")
    }

    this._active = true
  }

  set Address(address: Address){
    this._address = address
  }
}