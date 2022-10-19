interface CreateInvoiceFacadeInputDto{
  orderId: string;
  name: string;
  address: string;
  products: {
    id: string;
    name: string;
    price: number
  }[]
}

interface CreateInvoiceFacadeOutputDto {
  id: string
}

export interface InvoiceFacadeInterface {
  create(input: CreateInvoiceFacadeInputDto): Promise<CreateInvoiceFacadeOutputDto>;
}
