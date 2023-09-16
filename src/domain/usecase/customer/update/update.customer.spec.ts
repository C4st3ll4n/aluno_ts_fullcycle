import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";
import {InputUpdateCustomerDto} from "./update.customer.dto";
import FindCustomerUsecase from "../find/find.customer.usecase";
import UpdateCustomerUsecase from "./update.customer.usecase";

const mockCustomer = (): Customer => {
    const customer = new Customer("1", "Any Customer name");
    customer.address = new Address("Any Street", "any zip code", "Any City", "any number");
    return customer;
}
const mockUpdatedCustomer = (): Customer => {
    const customer = new Customer("1", "Any Customer name updated");
    customer.address = new Address("Any Street updated", "any zip code updated", "Any City updated", "any number updated");
    return customer;
}
const mockRepository = (): CustomerRepositoryInterface => {
    class CustomerRepositoryStub implements CustomerRepositoryInterface {
        create(entity: Customer): Promise<void> {
            return Promise.resolve(undefined);
        }

        find(id: string): Promise<Customer> {
            return Promise.resolve(mockUpdatedCustomer());
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
describe("Update Customer UseCase Test", () => {
    test("Should update a customer", async () => {
        const _customer = mockCustomer();
        const customerRepository = mockRepository();

        const usecase = new UpdateCustomerUsecase(customerRepository);

        const input: InputUpdateCustomerDto = {
            id: _customer.id,
            name: _customer.name,
            address: {
                street: _customer._address._street,
                city: _customer._address._city,
                zipcode: _customer._address._zip,
                houseNumber: _customer._address._number
            },
        }

        await usecase.execute(input);

        const output = await new FindCustomerUsecase(customerRepository).execute({
            id: _customer.id
        })

        expect(output.id).toEqual(expect.any(String))
        expect(output.name).toEqual("Any Customer name updated")
        expect(output.address.city).toEqual("Any City updated")
        expect(output.address.street).toEqual("Any Street updated")
    })
})