export interface FindStoreCatalogFacadeInputDto{
  id: string
}

export interface FindStoreCatalogFacadeOutputDto{
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface FindAllStoreCatalogFacadeOutputDto{
  products:{
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[]
}

export interface StoreCatalogFacadeInterface {
  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto>;
  find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto>;
}