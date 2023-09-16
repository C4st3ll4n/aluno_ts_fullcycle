import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import CustomerFactory from "../../../customer/factory/customer.factory";
import {InputUpdateCustomerDto, OutputUpdateCustomerDto} from "./update.customer.dto";

export default class UpdateCustomerUsecase {

    constructor(private readonly repository: CustomerRepositoryInterface) {
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = CustomerFactory.create(
            input.name, {
                _zip: input.address.zipcode,
                _street: input.address.street,
                _number: input.address.houseNumber,
                _city: input.address.city
            });

        customer._id = input.id;

        await this.repository.update(customer);

        const output = await this.repository.find(customer.id);

        return {
            id: output.id,
            name: output.name,
            address: {
                city: output._address._city,
                houseNumber: output._address._number,
                street: output._address._street,
                zipcode: output._address._zip
            }
        }
    }
}