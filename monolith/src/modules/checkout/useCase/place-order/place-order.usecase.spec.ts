import { Id } from "../../../@shared/domain/value-object/id.value-object"
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface"
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface"
import { PaymentFacadeInterface } from "../../../payment/facade/facade.interface"
import { ProductAdmFacade } from "../../../product-adm/facade/product-adm.facade"
import { ProductAdmFacadeInterface } from "../../../product-adm/facade/product-adm.facade.interface"
import { StoreCatalogFacade } from "../../../store-catalog/facade/store-catalog.facade"
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface"
import { Product } from "../../domain/product.entity"
import CheckoutGateway from "../../gateway/checkout.gateway"
import { PlaceOrderInputDto } from "./place-order.dto"
import { PlaceOrderUseCase } from "./place-order.usecase"

describe("PlaceOrderUseCase unit test", () => {
  let mockClientFacade: ClientAdmFacadeInterface;
  let mockProductFacade:  ProductAdmFacadeInterface;
  let mockCatalogFacade: StoreCatalogFacadeInterface;
  let mockCheckoutRepo: CheckoutGateway;
  let mockInvoiceFacade: InvoiceFacadeInterface;
  let mockPaymentFacade: PaymentFacadeInterface;
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
    mockCatalogFacade = {
      find: jest.fn().mockResolvedValue(null),
      findAll: jest.fn().mockResolvedValue([]),
    };
    mockPaymentFacade = {
      process: jest.fn()
    }
    mockInvoiceFacade = {
      create: jest.fn().mockResolvedValue({id: '1i'}),
    }

    mockCheckoutRepo = {
      addOrder: jest.fn(),
      findOrder: jest.fn(),
    }
    placeOrderUseCase = new PlaceOrderUseCase(
      mockClientFacade,
       mockProductFacade,
        mockCatalogFacade,
        mockCheckoutRepo,
         mockInvoiceFacade,
          mockPaymentFacade
          );
  })

  describe("validateProducts method", () => {


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
      const placeOrderUseCase = new PlaceOrderUseCase(mockClientFacade, {} as any as ProductAdmFacadeInterface, {} as any as StoreCatalogFacadeInterface, {} as any as CheckoutGateway, {} as any as InvoiceFacadeInterface, {} as any as PaymentFacadeInterface);

      const input: PlaceOrderInputDto = {
        clientId: "0",
        products: [],
      }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
        new Error("Cliente not found")
      )
    })

    it("should throw an error when products are not valid", async () => {
      const placeOrderUseCase = new PlaceOrderUseCase(mockClientFacade, {} as any as ProductAdmFacadeInterface, {} as any as StoreCatalogFacadeInterface, {} as any as CheckoutGateway, {} as any as InvoiceFacadeInterface, {} as any as PaymentFacadeInterface);

        const input: PlaceOrderInputDto = { clientId: "1", products: [] };
        await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
          new Error("No products selected")
        );
    })
  })



  describe('execute method', () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date());
    })

    afterAll(() => {
      jest.useRealTimers();
    })

      const clientProps = {
        id: "1c",
        name: "John Doe",
        document: '0000',
        email: 'john@doe.com',
        street: 'some address',
        number: '1',
        complement: '',
        city: 'some city',
        state: 'some state',
        zipCode: '0000',
      }


      const products = {
        'id': new Product({
          id: new Id("3"),
          description: "Product 3 description",
          name: "Product 3",
          salesPrice: 30,
        }),
        'id2': new Product({
          id: new Id("2"),
          description: "Product 2 description",
          name: "Product 2",
          salesPrice: 20,
        })
      }


      it('should not be approved',async () => {
        mockClientFacade.find = jest.fn().mockResolvedValue(clientProps);
        mockCatalogFacade.find = jest.fn().mockImplementation(({id}: {id: 'id' | 'id2'}) => {
         return products[id]
        })

        mockPaymentFacade.process = jest.fn().mockReturnValue({
          transactionId: '1t',
          orderId: '1o',
          amount: 100,
          status: 'error',
          createdAt: new Date(),
          updatedAt: new Date(),
        })

        const input: PlaceOrderInputDto = {
          clientId: '1c',
          products: [{productId:'id'}, {productId: 'id2'}]
        }

        const output = await placeOrderUseCase.execute(input);
        expect(output.invoiceId).toBeUndefined();
        expect(output.total).toBe(50);
        expect(output.products).toEqual([
          {productId: '3'},
          {productId: '2'}
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({id: '1c'});
        expect(mockCheckoutRepo.addOrder).not.toHaveBeenCalled();
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });
      })

      it('should be approved',async () => {
        mockPaymentFacade.process = jest.fn().mockReturnValue({
          transactionId: '1t',
          orderId: '1o',
          amount: 100,
          status: 'approved',
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        mockClientFacade.find = jest.fn().mockResolvedValue(clientProps);
        mockCatalogFacade.find = jest.fn().mockImplementation(({id}: {id: 'id' | 'id2'}) => {
         return products[id]
        })


        const input: PlaceOrderInputDto = {
          clientId: '1c',
          products: [{productId:'id'}, {productId: 'id2'}]
        }

        const output = await placeOrderUseCase.execute(input);
        expect(output.invoiceId).toBe('1i');
        expect(output.total).toBe(50);
        expect(output.products).toEqual([
          {productId: '3'},
          {productId: '2'}
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({id: '1c'});
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
          orderId: output.id,
          amount: output.total,
        });
      })
  })

})
