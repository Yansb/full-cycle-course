export interface ProcessPaymentInputDto{
  orderId: string;
  amount: number;
}

export interface ProcessPaymentOutputDto{
  transactionId: string;
  status: string;
  orderId: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}