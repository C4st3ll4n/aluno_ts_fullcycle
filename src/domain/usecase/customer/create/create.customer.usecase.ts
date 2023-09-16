import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import {InputCreateCustomerDTO, OutputCreateCostumerDTO} from "./create.customer.dto";
import {v4} from "uuid";
import CustomerFactory from "../../../customer/factory/customer.factory";

export default class CreateCustomerUsecase {

    constructor(private readonly repository: CustomerRepositoryInterface) {
    }

    async execute(input: InputCreateCustomerDTO): Promise<OutputCreateCostumerDTO> {
        const customerId = v4()
        const customer = CustomerFactory.create(input.name, {
            _zip: input.address.zipcode,
            _street: input.address.street,
            _number: input.address.houseNumber,
            _city: input.address.city
        });

        await this.repository.create(customer);

        return {
            id: customerId,
            name: customer.name,
            address:{
                city: customer._address._city,
                houseNumber: customer._address._number,
                street: customer._address._street,
                zipcode: customer._address._zip
            }
        }
    }
}