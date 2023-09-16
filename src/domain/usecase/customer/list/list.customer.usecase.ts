import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import {OutputCustomer, OutputListCustomerDto} from "./list.customer.dto";

export class ListCustomerUsecase {
    constructor(private readonly repository: CustomerRepositoryInterface) {
    }

    async execute(): Promise<OutputListCustomerDto> {
        const customers = await this.repository.findAll();

        return {
            customers: customers.map((item): OutputCustomer => {
                return {
                    id: item.id,
                    name: item.name,
                    address: {
                        street: item._address._street,
                        zipcode: item._address._zip,
                        city: item._address._city,
                        houseNumber: item._address._number,
                    }
                }
            })
        }
    }
}