export interface InputCreateProductDto{
  name: string;
  price: number;
  type: "a" | "b";
}

export interface OutputCreateProductDto{
  id: string;
  name: string;
  price: number;
}