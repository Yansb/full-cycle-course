import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { CheckStockInputDto, CheckStockOutputDto } from "./find-stock.dto";

export class FindStockUseCase implements UseCaseInterface{
  constructor(private readonly repository: ProductGateway) {}

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this.repository.find(input.productId);
    return {
      productId: product.id.id,
      stock: product.stock,
    }
  }
}