import { FindAllProductsUseCase } from "../useCase/find-all-products/find-all-products.usecase";
import { FindProductUseCase } from "../useCase/find-product/find-product.usecase";
import { FindAllStoreCatalogFacadeOutputDto, FindStoreCatalogFacadeInputDto, FindStoreCatalogFacadeOutputDto, StoreCatalogFacadeInterface } from "./store-catalog.facade.interface";

export interface UseCaseProps{
  findUseCase: FindProductUseCase,
  findAllUseCase: FindAllProductsUseCase,
}

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private findUseCase: FindProductUseCase;
  private findAllUseCase: FindAllProductsUseCase;

  constructor(props: UseCaseProps) {
    this.findUseCase = props.findUseCase;
    this.findAllUseCase = props.findAllUseCase;
  }

  findAll(): Promise<FindAllStoreCatalogFacadeOutputDto> {
    return this.findAllUseCase.execute()
  }
  
  async find(id: FindStoreCatalogFacadeInputDto): Promise<FindStoreCatalogFacadeOutputDto> {
    return this.findUseCase.execute(id);
  }

}