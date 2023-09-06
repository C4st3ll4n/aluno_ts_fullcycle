import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe("Customer Factory Unit Test", ()=>{
    it("should create a new costumer", ()=>{
        const customer = CustomerFactory.create("Jhon")
        expect(customer).toBeDefined()
        expect(customer.id).toBeDefined()
        expect(customer.name).toBeDefined()
        expect(customer.name).toBe("Jhon")
    })

    it("should create a new costumer with an address", ()=>{
        const customer = CustomerFactory.create("Jhon", new Address("My Street", "000000001", "Any", "3113A"))
        expect(customer).toBeDefined()
        expect(customer.id).toBeDefined()
        expect(customer.name).toBeDefined()
        expect(customer.name).toBe("Jhon")
        expect(customer._address).toBeDefined()
        expect(customer._address._street).toBe("My Street")
    })
})