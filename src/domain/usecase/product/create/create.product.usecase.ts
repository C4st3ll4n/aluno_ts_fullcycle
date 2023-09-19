import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import {InputCreateProductDTO, OutputCreateProductDTO} from "./create.product.dto";
import Product from "../../../product/entity/product";
import ProductFactory from "../../../product/factory/product.factory";

export default class CreateProductUsecase {

    constructor(private readonly repository: ProductRepositoryInterface) {
    }

    async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
        const entity = ProductFactory.create(input.name, input.price);
        await this.repository.create(entity as Product)
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price
        }
    }
}