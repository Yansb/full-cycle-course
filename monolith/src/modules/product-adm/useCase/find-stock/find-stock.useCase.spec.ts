import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { FindStockUseCase } from "./find-stock.useCase"

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue({id: new Id("1"), stock: 10}),
  }
}

describe("FindStockUseCase",  () => {

  it("should find stock", async () => {
    const mockRepository = MockRepository()
    const useCase = new FindStockUseCase(mockRepository)

    const input = {
      productId: "1"
    }

    const response = await useCase.execute(input)

    expect(mockRepository.find).toHaveBeenCalled()
    expect(response).toEqual({
      productId: "1",
      stock: 10,
    })
  })

})