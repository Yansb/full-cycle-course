import { Sequelize } from "sequelize-typescript";
import { PaymentFacadeFactory } from "../factory/payment.facade.factory";
import { TransactionModel } from "../repository/transaction.model";

describe("Payment Facade", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })


  it("should create a transaction", async () => {

    const facade = PaymentFacadeFactory.create();

    const input = {
      orderId: "1",
      amount: 100
    }

    const output = await facade.process(input);

    expect(output.transactionId).toBeDefined();
    expect(output.status).toBe("approved");
    expect(output.orderId).toBe("1");
    expect(output.amount).toBe(100);
    expect(output.createdAt).toBeDefined();
    expect(output.updatedAt).toBeDefined();
  })
})