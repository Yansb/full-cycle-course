class Address{
  _street: string = "";
  _number: number = 0;
  _zip: string = "";
  _city: string = "";

  constructor(street: string, number: number, zip: string, city: string){
    this._street = street;
    this._number = number;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  validate(){
    if(this._city.length === 0){
      throw new Error("city is required")
    }
    if(this._zip.length === 0){
      throw new Error("zip is required")
    }
    if(this._number === 0){
      throw new Error("number is required")
    }
    if(this._street.length === 0){
      throw new Error("street is required")
    }
  }
}