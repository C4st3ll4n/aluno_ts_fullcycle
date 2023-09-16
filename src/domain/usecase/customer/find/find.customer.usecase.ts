import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import {InputFindCustomerDTO, OutputFindCustomerDTO} from "./find.customer.dto";

export default class FindCustomerUsecase {

    constructor(private readonly repository: CustomerRepositoryInterface) {
    }

    async execute(input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
        const customer = await this.repository.find(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer._address._street,
                city: customer._address._city,
                zipcode: customer._address._zip,
                houseNumber: customer._address._number,
            }
        };
    }
}