import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import { PaymentFacadeInterface } from "../../../payment/facade/facade.interface";
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import { Order } from "../../domain/order.entity";
import { Product } from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export class PlaceOrderUseCase implements UseCaseInterface {
  constructor(
    private clientFacade: ClientAdmFacadeInterface,
    private readonly productFacade: ProductAdmFacadeInterface,
    private readonly catalogFacade: StoreCatalogFacadeInterface,
    private readonly repository: CheckoutGateway,
    private readonly invoiceFacade: InvoiceFacadeInterface,
    private readonly paymentFacade: PaymentFacadeInterface,
    ) {}

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this.clientFacade.find({id:input.clientId});

    if (!client) {
      throw new Error("Cliente not found");
    }

    await this.validateProducts(input);

    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    )

    const myClient = new Client({
      ...client,
      id: new Id(client.id),
    })

    const order = new Order({
      client: myClient,
      products,
    })

    const payment = await this.paymentFacade.process({
      orderId: order.id.id,
      amount: order.total,
    })

    const invoice =
      payment.status === "approved" ?
      await this.invoiceFacade.create({
        orderId: order.id.id,
        address: client.address,
        name: client.name,
        products: order.products.map(p => ({id: p.id.id, name: p.name, price: p.salesPrice}))
      }) : null

      if(payment.status === "approved"){
        this.repository.addOrder(order);
      }

    return{
      id: order.id.id,
      invoiceId: invoice?.id,
      status: order.status,
      total: order.total,
      //@ts-ignore
      products: order.products.map(p => ({productId: p.id.id.id}))
    }
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if(input.products.length === 0){
      throw new Error('No products selected');
    }

    for(const p of input.products){
      const product = await this.productFacade.checkStock({productId: p.productId});
      if(product.stock <= 0){
        throw new Error(`Product ${p.productId} is out of stock`);
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this.catalogFacade.find({id: productId});
    if(!product){
      throw new Error("Product not found")
    }
    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };

    return new Product(productProps);
  }
}
