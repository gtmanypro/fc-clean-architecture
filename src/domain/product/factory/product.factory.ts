import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-course";
import ProductCourse from "../entity/product-course";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid(), name, price);
      case "Course":
        return new ProductCourse(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}
