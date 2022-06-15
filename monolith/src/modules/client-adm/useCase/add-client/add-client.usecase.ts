import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { UseCaseInterface } from "../../../@shared/useCase/use-case.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export class AddClientUseCase  implements UseCaseInterface{

  constructor(private clientRepository: ClientGateway){}

  async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
    const props = {
      ...input,
      id: input.id ? new Id(input.id) : undefined
    }
    
    const client = new Client(props);
    
    await this.clientRepository.add(client);

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    }
  }

}