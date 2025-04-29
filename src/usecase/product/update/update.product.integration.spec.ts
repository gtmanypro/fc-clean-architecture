import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUsecase = new CreateProductUseCase(productRepository);
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const inputProduct = {
        type: "Course",
        name: "DDD Course",
        price: 100
    };

    const productCreated = await createProductUsecase.execute(inputProduct);

    productCreated.name = "Clean arch Course";

    const result = await updateProductUseCase.execute(productCreated);

    expect(result).toEqual({
        id: productCreated.id,
        name: productCreated.name,
        price: productCreated.price
    });
  });
});
