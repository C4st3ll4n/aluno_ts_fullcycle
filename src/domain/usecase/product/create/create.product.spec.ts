import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import Product from "../../../product/entity/product";
import CreateProductUsecase from "./create.product.usecase";
import {InputCreateProductDTO, OutputCreateProductDTO} from "./create.product.dto";

jest.mock("uuid", () => ({
    v4(): string {
        return "any_id";
    }
}))
const mockProduct = (): Product => {
    return new Product("any_id", "any_name", 25.00);
}
const mockRepository = (): ProductRepositoryInterface => {
    class ProductRepositoryStub implements ProductRepositoryInterface {
        create(entity: Product): Promise<void> {
            return Promise.resolve(undefined);
        }

        find(id: string): Promise<Product> {
            return Promise.resolve(mockProduct());
        }

        findAll(): Promise<Product[]> {
            return Promise.resolve([mockProduct()]);
        }

        update(entity: Product): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    return new ProductRepositoryStub();
}
describe("Create Product UseCase Test", () => {
    test("Should create a product", async () => {
        const product = mockProduct();
        const repository = mockRepository();

        const usecase = new CreateProductUsecase(repository);
        const input: InputCreateProductDTO = {
            name: "any_name",
            price: 25.00
        }

        const output: OutputCreateProductDTO = await usecase.execute(input);

        expect(output.id).toEqual("any_id")
        expect(output.name).toEqual("any_name")
        expect(output.price).toEqual(25.00)
    })
})