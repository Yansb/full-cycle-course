import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  constructor(private clientFacade: ClientAdmFacadeInterface) {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientFacade.find({id:input.clientId});

    if (!client) {
      throw new Error("Cliente not found");
    }

    return{
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: []
    }
  }
}
