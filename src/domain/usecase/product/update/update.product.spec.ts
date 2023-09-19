import Product from "../../../product/entity/product";
import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import UpdateProductUsecase from "./update.product.usecase";
import {InputUpdateProductDTO} from "./update.product.dto";

const mockProduct = (): Product => {
    return new Product("any_id", "any_name", 25.00);
}

const mockUpdatedProduct = (): Product => {
    return new Product("any_id", "updated name", 250.00);
}


const mockRepository = (): ProductRepositoryInterface => {
    class ProductRepositoryStub implements ProductRepositoryInterface {
        create(entity: Product): Promise<void> {
            return Promise.resolve(undefined);
        }

        find(id: string): Promise<Product> {
            return Promise.resolve(mockUpdatedProduct());
        }

        findAll(): Promise<Product[]> {
            return Promise.resolve([mockUpdatedProduct()]);
        }

        update(entity: Product): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    return new ProductRepositoryStub();
}
describe("Update Product UseCase Test", () => {
    test("Should update a product", async () => {
        const product = mockProduct();
        product.changeName("updated name");
        product.changePrice(250.00);

        const repository = mockRepository();
        const usecase = new UpdateProductUsecase(repository);

        const input: InputUpdateProductDTO = {
            id: product.id,
            price: product.price,
            name: product.name,
        }

        const output = await usecase.execute(input);

        expect(output.id).toEqual(product.id);
        expect(output.name).toEqual("updated name");
        expect(output.price).toEqual(250.00);
    })
})