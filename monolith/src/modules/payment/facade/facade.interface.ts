export interface PaymentFacadeInputDto{
  orderId: string;
  amount: number;
}

export interface PaymentFacadeOutputDto{
  transactionId: string;
  status: string;
  orderId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentFacadeInterface{
  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto>;
}