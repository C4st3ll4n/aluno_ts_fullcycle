import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";
import {ListCustomerUsecase} from "./list.customer.usecase";

const mockRepository = (): CustomerRepositoryInterface => {
    class CustomerRepositoryStub implements CustomerRepositoryInterface {
        create(entity: Customer): Promise<void> {
            return Promise.resolve(undefined);
        }

        find(id: string): Promise<Customer> {
            return Promise.resolve(mockCustomer("1"));
        }

        findAll(): Promise<Customer[]> {
            return Promise.resolve([mockCustomer("1"),mockCustomer("2")]);
        }

        update(entity: Customer): Promise<void> {
            return Promise.resolve(undefined);
        }
    }

    return new CustomerRepositoryStub();
}

const mockCustomer = (id: string): Customer => {
    const customer = new Customer(id, "Any Customer name");
    customer.address = new Address("Any Street", "any zip code", "Any City", "any number");
    return customer;
}
describe("List Customer Use Case Test", () => {
    test('Should return 2 customers', async ()=>{
        const customer1 = mockCustomer("1")
        const customer2 = mockCustomer("2")

        const output = await new ListCustomerUsecase(mockRepository()).execute()
        const customers = output.customers;
        expect(customers.length).toEqual(2)

        expect(customers[0].id).toEqual("1")
        expect(customers[0].name).toEqual("Any Customer name")
        expect(customers[0].address.city).toEqual("Any City")
        expect(customers[0].address.street).toEqual("Any Street")

        expect(customers[1].id).toEqual("2")
        expect(customers[1].name).toEqual("Any Customer name")
        expect(customers[1].address.city).toEqual("Any City")
        expect(customers[1].address.street).toEqual("Any Street")
    })
})