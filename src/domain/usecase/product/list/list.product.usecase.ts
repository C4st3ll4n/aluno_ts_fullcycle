import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import {InputListProductDTO, OutputListProductDTO, OutputProduct} from "./list.product.dto";

export default class ListProductUsecase {

    constructor(private readonly repository: ProductRepositoryInterface) {
    }

    async execute(input: InputListProductDTO): Promise<OutputListProductDTO> {
        const products = await this.repository.findAll();
        return {
            products: products.map((e): OutputProduct => ({
                id: e.id,
                price: e.price,
                name: e.name
            }))
        }
    }
}