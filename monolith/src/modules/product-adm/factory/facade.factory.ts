import { ProductAdmFacade } from "../facade/product-adm.facade";
import { ProductRepository } from "../repository/product.repository";
import { AddProductUseCase } from "../useCase/add-product/add-product.useCase";
import { FindStockUseCase } from "../useCase/find-stock/find-stock.useCase";

export class ProductAdmFacadeFactory{
  static create(){
    const productRepository = new ProductRepository();
    const addProductUseCase = new AddProductUseCase(productRepository);
    const findStockUseCase = new FindStockUseCase(productRepository);

    const productFacade = new ProductAdmFacade({
      addUseCase: addProductUseCase,
      stockUseCase: findStockUseCase,
    });

    return productFacade;
  }
}