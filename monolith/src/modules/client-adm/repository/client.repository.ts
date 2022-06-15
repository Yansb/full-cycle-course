import { Id } from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import clientEntity from "../domain/client.entity";
import ClientGateway from "../gateway/client.gateway";
import { ClientModel } from "./client.model";

export class ClientRepository implements ClientGateway {
  async add(client: clientEntity): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.updatedAt,
      updatedAt: client.createdAt,
    })
  }
  
  async find(id: string): Promise<clientEntity> {
    const client = await ClientModel.findOne({where: {id}})

    if(!client) {
      throw new Error('client not found')
    }

    return new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    })
  }

  
}