import Customer from "./customer"
import Address from "./address"

describe("Customer test", () => {
    test("Should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "Pedro");
        }).toThrowError("Id is required")
    })

    test("Should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrowError("Name is required")
    })

    test("Should change name", () => {
        let customer = new Customer("1", "Pedro");
        customer.changeName("Henrique")

        expect(customer.name).toBe("Henrique")
    })

    test("Should throw error when activate a customer with empty address", () => {
        let customer = new Customer("1", "Pedro");
        expect(customer.activate).toThrowError()
    })

    test("Should activate", () => {
        let customer = new Customer("1", "Pedro");
        customer.address = new Address("Rua A", "12345-678", "São Paulo", "56")
        customer.activate()

        expect(customer.isActive).toBe(true)
    })

    test("Should deactivate", () => {
        let customer = new Customer("1", "Pedro");
        customer.deactivate()

        expect(customer.isActive).toBe(false)
    })

    test("Should add reward points", () => {
        let customer = new Customer("1", "Pedro");
        expect(customer.rewardPoints).toBe(0)
        
        customer.addRewardPoints(10)

        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(10)

        expect(customer.rewardPoints).toBe(20)
    })
})