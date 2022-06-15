import { Sequelize } from "sequelize-typescript";
import { ClientAdmFacadeFactory } from "../factory/client.facade.factory";
import { ClientModel } from "../repository/client.model";
import { ClientRepository } from "../repository/client.repository";
import { AddClientUseCase } from "../useCase/add-client/add-client.usecase";
import { FindClientUseCase } from "../useCase/find-client/find-client.usecase";
import { ClientAdmFacade } from "./client-adm.facade";

describe("ClientAdm facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    
    const facade = new ClientAdmFacade(
      addUseCase,
    );

    const input = {
      id: "1",
      name: "Client 1",
      email: "email@email.com",
      address: "Address 1"
    }

    
    await facade.add(input)

    const client = await ClientModel.findOne({where: {id: "1"}})

    expect(client).toBeDefined();
    expect(client!.id).toBe("1");
    expect(client!.name).toBe("Client 1");
    expect(client!.email).toBe(input.email);
  })

  it("should find a client", async () => {
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "email@email.com",
      address: "Address 1"
    }

    
    await facade.add(input)

    const client = await facade.find({id: "1"})

    expect(client).toBeDefined();
    expect(client!.id).toBe("1");
    expect(client!.name).toBe("Client 1");
    expect(client!.email).toBe(input.email);
    expect(client!.address).toBe(input.address);

  })
})