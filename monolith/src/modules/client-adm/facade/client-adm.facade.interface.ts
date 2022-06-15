export interface AddClientFacadeInputDto{
  name: string;
  email: string;
  address: string;
  id?: string;
}

export interface FindClientFacadeInputDto{
  id: string;
}

export interface FindClientFacadeOutputDto{
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
  add(input: AddClientFacadeInputDto): Promise<void>;
  find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}