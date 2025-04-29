import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test list product use case", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUsecase = new CreateProductUseCase(productRepository);
    const listProductUsecase = new ListProductUseCase(productRepository);

    const inputProduct1 = {
        type: "Course",
        name: "DDD Course",
        price: 100
    };

    
    const inputProduct2 = {
        type: "Course",
        name: "Clean arch Course",
        price: 150
    };

    await createProductUsecase.execute(inputProduct1);
    await createProductUsecase.execute(inputProduct2);

    const result = await listProductUsecase.execute({});
    expect(result.products.length).toBe(2);
    expect(result.products[0]).toEqual({
        id: expect.any(String),
        name: inputProduct1.name,
        price: inputProduct1.price
    });
    expect(result.products[1]).toEqual({
        id: expect.any(String),
        name: inputProduct2.name,
        price: inputProduct2.price
    });
  });
});
