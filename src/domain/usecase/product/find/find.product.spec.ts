import Product from "../../../product/entity/product";
import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import FindProductUsecase from "./find.product.usecase";
import {InputFindProductDTO} from "./find.product.dto";

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
describe("Find Product UseCase Test", () => {
    test("Should find a product", async () => {
        const repository = mockRepository();
        const usecase = new FindProductUsecase(repository);
        const input: InputFindProductDTO = {
            id: "any_id"
        };
        const output = await usecase.execute(input);

        expect(output.id).toEqual("any_id")
        expect(output.name).toEqual("any_name")
        expect(output.price).toEqual(25.00)
    })
})