import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import {InputCreateCustomerDTO} from "./create.customer.dto";
import CreateCustomerUsecase from "./create.customer.usecase";

const mockCustomer = (): Customer => {
    const customer = new Customer("1", "Any Customer name");
    customer.address = new Address("Any Street", "any zip code", "Any City", "any number");
    return customer;
}
const mockRepository = (): CustomerRepositoryInterface => {
    class CustomerRepositoryStub implements CustomerRepositoryInterface {
        create(entity: Customer): Promise<void> {
            return Promise.resolve(undefined);
        }

        find(id: string): Promise<Customer> {
            return Promise.resolve(mockCustomer());
        }

        findAll(): Promise<Customer[]> {
            return Promise.resolve([mockCustomer()]);
        }

        update(entity: Customer): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    return new CustomerRepositoryStub();
}

describe("Create Customer UseCase Test", () => {
    test("Should create a customer", async () => {
        const _customer = mockCustomer();
        const customerRepository = mockRepository();

        const usecase = new CreateCustomerUsecase(customerRepository)
        const input: InputCreateCustomerDTO = {
            name: _customer.name,
            address: {
                city: _customer._address._city,
                street: _customer._address._street,
                houseNumber: _customer._address._number,
                zipcode: _customer._address._zip
            }
        }

        const output = await usecase.execute(input);

        expect(output.id).toEqual("1")
        expect(output.name).toEqual("Any Customer name updated")
        expect(output.address.city).toEqual("Any City updated")
        expect(output.address.street).toEqual("Any Street updated")
    })
})