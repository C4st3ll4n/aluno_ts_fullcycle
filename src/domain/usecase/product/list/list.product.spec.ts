import Product from "../../../product/entity/product";
import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import ListProductUsecase from "./list.product.usecase";

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
describe("List Product UseCase Test", () => {
    test("Should list products", async () => {
        const repository = mockRepository();
        const output = await new ListProductUsecase(repository).execute({});
        expect(output.products.length).toEqual(1)
        expect(output.products[0].id).toEqual("any_id")
        expect(output.products[0].price).toEqual(25.00)
        expect(output.products[0].name).toEqual("any_name")
    })
})