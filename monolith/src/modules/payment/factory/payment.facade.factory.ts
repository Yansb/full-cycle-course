import { PaymentFacade } from "../facade/payment.facade";
import { TransactionRepository } from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../useCase/process-payment/process-payment.usecase";

export class PaymentFacadeFactory {
  static create() {
    const paymentRepository = new TransactionRepository();
    const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository);

    return new PaymentFacade(processPaymentUseCase);
  }
}