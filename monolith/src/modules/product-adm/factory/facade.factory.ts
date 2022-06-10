import { ProductAdmFacade } from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../useCase/add-product/add-product.useCase";
import { FindStockUseCase } from "../useCase/find-stock/find-stock.useCase";

export class ProductAdmFacadeFactory{
  static create(){
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: undefined,
    });

    return productFacade;
  }

  static findStock() {
    const productRepository = new ProductRepository();
    const findStockUseCase = new FindStockUseCase(productRepository);
    const productFacade = new ProductAdmFacade({
      addUseCase: undefined,
      stockUseCase: findStockUseCase,
    })

    return productFacade;
  }
}