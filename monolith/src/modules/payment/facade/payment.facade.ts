import { UseCaseInterface } from "../../@shared/useCase/use-case.interface";
import { PaymentFacadeInputDto, PaymentFacadeInterface, PaymentFacadeOutputDto } from "./facade.interface";

export class PaymentFacade implements PaymentFacadeInterface{
  constructor(private processPaymentUseCase: UseCaseInterface){}

  process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    return this.processPaymentUseCase.execute(input)
  }
}