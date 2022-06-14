import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import { Product } from "../../domain/product.entity";
import { ProductGateway } from "../../gateway/product.gateway";
import { FindAllProductsDto } from "./find-all-products.dto";

export class FindAllProductsUseCase implements UseCaseInterface {

  constructor(private productRepository: ProductGateway) {}

  async execute(): Promise<FindAllProductsDto> {
    const products = await this.productRepository.findAll();

    return {
      products: products.map(product => ({
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice,
        id: product.id.id,
      }))
    };
  } 
}