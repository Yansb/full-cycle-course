import { Product } from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export class UpdateProductUseCase{
  constructor(private productRepository: ProductRepositoryInterface){}

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto>{
    const product = new Product(input.id, input.name, input.price);
    await this.productRepository.update(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    }
  }
  
}