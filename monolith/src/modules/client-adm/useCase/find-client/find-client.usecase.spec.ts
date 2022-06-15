import { Id } from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import { FindClientUseCase } from "./find-client.usecase";

const client = new Client({
  address: "street 1",
  email: "email@email.com",
  name: "Client 1",
  id: new Id("1"),
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(client)),
  };
}

describe("Find client useCase unity test", () => {
  it("Should find a client", async () => {
    const repository = MockRepository();
    const useCase = new FindClientUseCase(repository);
    
    const input = {
      id: "1"
    }

    const result = await useCase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toEqual(client.id.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
  })
})