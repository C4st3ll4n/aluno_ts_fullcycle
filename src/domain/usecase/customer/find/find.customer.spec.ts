import Customer from "../../../customer/entity/customer";
import Address from "../../../customer/value-object/address";
import {InputFindCustomerDTO, OutputFindCustomerDTO} from "./find.customer.dto";
import FindCustomerUsecase from "./find.customer.usecase";
import CustomerRepositoryInterface from "../../../customer/repository/customer-repository.interface";

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
describe("Find Customer UseCase Test", () => {
    test('should find a costumer', async () => {
        const customerRepository = mockRepository();

        const usecase = new FindCustomerUsecase(customerRepository)

        const input: InputFindCustomerDTO = {
            id: "1",
        };

        const output = await usecase.execute(input);

        expect(output.id).toEqual("1")
        expect(output.name).toEqual("Any Customer name")
        expect(output.address.city).toEqual("Any City")
        expect(output.address.street).toEqual("Any Street")
    });

    test('should not find a costumer', async () => {
        const customerRepository = mockRepository();
        jest.spyOn(customerRepository, "find").mockImplementationOnce(
            ()=>{
                throw new Error("Not Found")
            }
        );
        const usecase = new FindCustomerUsecase(customerRepository)

        const input: InputFindCustomerDTO = {
            id: "10",
        };

        const promise =  usecase.execute(input);

        expect(promise).rejects.toThrow("Not Found")
    });
})