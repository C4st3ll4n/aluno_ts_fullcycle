import ProductRepositoryInterface from "../../../product/repository/product-repository.interface";
import {InputFindProductDTO, OutputFindProductDTO} from "./find.product.dto";

export default class FindProductUsecase {

    constructor(private readonly repository: ProductRepositoryInterface) {
    }

    async execute(input: InputFindProductDTO): Promise<OutputFindProductDTO> {
        const output = await this.repository.find(input.id);
        return {
            id: output.id,
            name: output.name,
            price: output.price
        }
    }
}