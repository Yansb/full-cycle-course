export interface FindProductDtoInput {
  id: string;
}

export interface FindProductDtoOutput {
  id: string;
  name: string;
  description: string;
  salesPrice: number
}