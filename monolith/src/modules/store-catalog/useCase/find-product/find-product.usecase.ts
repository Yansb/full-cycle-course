import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import { ProductGateway } from "../../gateway/product.gateway";
import { FindProductDtoInput, FindProductDtoOutput } from "./find-product.dto";

export class FindProductUseCase implements UseCaseInterface {
  constructor(private repository: ProductGateway){}

  async execute(input: FindProductDtoInput): Promise<FindProductDtoOutput> {
    const product = await this.repository.find(input.id);
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }

}