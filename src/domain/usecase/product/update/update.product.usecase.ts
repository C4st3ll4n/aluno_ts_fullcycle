import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import {InputUpdateProductDTO, OutputUpdateProductDTO} from "./update.product.dto";
import Product from "../../../product/entity/product";

export default class UpdateProductUsecase {

    constructor(private readonly repository: ProductRepositoryInterface) {
    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const product = new Product(input.id, input.name, input.price);
        await this.repository.update(product);
        const output = await this.repository.find(product.id);
        return {
            id: output.id,
            name: output.name,
            price: output.price,
        }
    }
}