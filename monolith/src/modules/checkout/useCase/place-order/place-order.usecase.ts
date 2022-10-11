import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  constructor(private clientFacade: ClientAdmFacadeInterface, private readonly productFacade: ProductAdmFacadeInterface) {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientFacade.find({id:input.clientId});

    if (!client) {
      throw new Error("Cliente not found");
    }

    await this.validateProducts(input);

    return{
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: []
    }
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if(input.products.length === 0){
      throw new Error('No products selected');
    }

    for(const p of input.products){
      const product = await this.productFacade.checkStock({productId: p.productId});
      console.log(p, product.stock);
      if(product.stock <= 0){
        throw new Error(`Product ${p.productId} is out of stock`);
      }
    }
  }
}
