import { UseCaseInterface } from "../../@shared/useCase/use-case.interface";
import { AddClientFacadeInputDto, ClientAdmFacadeInterface, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(
    private readonly addUseCase: UseCaseInterface,
    private readonly findUseCase?: UseCaseInterface,
  ) {}
  
  async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
    return this.findUseCase.execute(input)
  }

  async add(input: AddClientFacadeInputDto): Promise<void> {
    await this.addUseCase.execute(input);
  }
}