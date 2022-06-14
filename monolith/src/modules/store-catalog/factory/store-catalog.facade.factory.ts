import { StoreCatalogFacade } from "../facade/store-catalog.facade";
import { ProductRepository } from "../repository/product.repository";
import { FindAllProductsUseCase } from "../useCase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../useCase/find-product/find-product.usecase";

export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade{
    const productRepository = new ProductRepository()
    const findUseCase = new FindProductUseCase(productRepository);
    const findAllUseCase = new FindAllProductsUseCase(productRepository);

    return new StoreCatalogFacade({
      findUseCase,
      findAllUseCase,
    })

  }
}