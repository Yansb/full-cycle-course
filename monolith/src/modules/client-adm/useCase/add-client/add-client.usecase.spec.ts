import { Id } from "../../../@shared/domain/value-object/id.value-object";
import { AddClientUseCase } from "./add-client.usecase";

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn(),
  };
}

describe("Add client useCase unity test", () => {
  it("Should add a client", async () => {
    const repository = MockRepository();
    const useCase = new AddClientUseCase(repository);
    
    const input = {
      name: "Client 1",
      email: "email@email.com",
      address: "street 1",
    }

    const result = await useCase.execute(input);

    expect(repository.add).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
  })
})