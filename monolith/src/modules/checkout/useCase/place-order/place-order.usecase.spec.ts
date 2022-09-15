import { PlaceOrderInputDto } from "./place-order.dto"
import { PlaceOrderUseCase } from "./place-order.usecase"

describe("PlaceOrderUseCase unit test", () => {

  describe("execute method", () => {
    it("should throw an error when client not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      }
      //@ts-expect-error - no params in constructor
      const placeOrderUseCase = new PlaceOrderUseCase(mockClientFacade);
      //@ts-expect-error - force set clientFacade
      placeOrderUseCase["clientFacade"] = mockClientFacade;

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("Cliente not found")
      )
    })
  })

})
