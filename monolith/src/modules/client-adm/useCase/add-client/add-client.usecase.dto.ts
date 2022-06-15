export interface AddClientInputDto{
  name: string;
  email: string;
  address: string;
  id?: string;
}

export interface AddClientOutputDto{
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}