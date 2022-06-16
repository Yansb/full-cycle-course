import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import { Transaction } from "../../domain/transaction";
import { PaymentGateway } from "../../gateway/payment.gateway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(
    private transactionRepository: PaymentGateway
  ) {}

  async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
    const transaction = new Transaction(input)

    transaction.process();

    const persistedTransaction = await this.transactionRepository.save(transaction);

    return {
      transactionId: persistedTransaction.id.id,
      orderId: persistedTransaction.orderId,
      amount: persistedTransaction.amount,
      status: persistedTransaction.status,
      createdAt: persistedTransaction.createdAt,
      updatedAt: persistedTransaction.updatedAt
    }
  }

}