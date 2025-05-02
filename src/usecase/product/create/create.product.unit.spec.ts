import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

  const input: InputCreateProductDto = {
    name: "Curso Clean Arch",
    type: "Course",
    price: 399.99
  }
  
describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUsecase = new CreateProductUseCase(productRepository);

        const output = await productCreateUsecase.execute(input);

        expect(output).toEqual({
                id: expect.any(String),
                name: input.name,
                price: input.price
        });
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUsecase = new CreateProductUseCase(productRepository);
    
        input.name = "";
    
        await expect(productCreateUsecase.execute(input)).rejects.toThrow(
          "Name is required"
        );
    });

    it("should thrown an error when price is missing", async () => {
      const productRepository = MockRepository();
      const productCreateUsecase = new CreateProductUseCase(productRepository);
  
      input.name = "Curso Clean Arch";
      input.price = undefined
  
      await expect(productCreateUsecase.execute(input)).rejects.toThrow(
        "Price is required"
      );
  });
});