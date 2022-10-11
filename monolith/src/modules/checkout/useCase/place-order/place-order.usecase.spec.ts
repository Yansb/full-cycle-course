import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface"
import { ProductAdmFacade } from "../../../product-adm/facade/product-adm.facade"
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface"
import { PlaceOrderInputDto } from "./place-order.dto"
import { PlaceOrderUseCase } from "./place-order.usecase"

describe("PlaceOrderUseCase unit test", () => {

  describe("validateProducts method", () => {
    let mockClientFacade: ClientAdmFacadeInterface;
    let mockProductFacade:  ProductAdmFacadeInterface;
    let placeOrderUseCase: PlaceOrderUseCase;

    beforeEach(() => {
      mockClientFacade = {
        find: jest.fn().mockResolvedValue({id: "1", name: "John Doe"}),
        add: jest.fn()
      }
      mockProductFacade = {
        addProduct: jest.fn(),
        checkStock: jest.fn(({productId}: {productId: string}) => Promise.resolve({
          productId,
          stock: productId === "1" ? 0 : 1,
        })),
      }
      placeOrderUseCase = new PlaceOrderUseCase(mockClientFacade, mockProductFacade);
    })

    it("should throw error if no products are selected", async () => {
      const input: PlaceOrderInputDto ={
        clientId: "1",
        products: []
      };

      await expect(placeOrderUseCase.execute(input))
      .rejects.toThrow(new Error("No products selected"));
    })

    it("should throw an error when product is out of stock", async () => {
      let input: PlaceOrderInputDto ={
        clientId: "1",
        products: [{productId: "0"}, {productId: "1"}]

      };

      await expect(placeOrderUseCase.execute(input))
      .rejects.toThrow(new Error("Product 1 is out of stock"));

      input = {
        clientId: "0",
        products: [{productId: "0"},  {productId: "2"},{productId: "1"}]
      };

      await expect(placeOrderUseCase.execute(input))
      .rejects.toThrow(new Error("Product 1 is out of stock"));
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
    })

  })

  describe("execute method", () => {
    it("should throw an error when client not found", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(null),
      }as any as ClientAdmFacadeInterface
      const placeOrderUseCase = new PlaceOrderUseCase(mockClientFacade, {} as any as ProductAdmFacadeInterface);

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("Cliente not found")
      )
    })

    it("should throw an error when products are not valid", async () => {
      const mockClientFacade = {
        find: jest.fn().mockResolvedValue(true),
      }as any as ClientAdmFacadeInterface;
      const placeOrderUseCase = new PlaceOrderUseCase(mockClientFacade, {} as any as ProductAdmFacadeInterface);

        const input: PlaceOrderInputDto = { clientId: "1", products: [] };
        await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
          new Error("No products selected")
        );
    })
  })

})
