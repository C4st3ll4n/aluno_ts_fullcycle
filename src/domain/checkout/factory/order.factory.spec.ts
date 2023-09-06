import {v4} from "uuid";
import OrderFactory from "./order.factory";

describe("ORder Factory Unit Test", ()=>{
    it("should create a new order", ()=>{
        const orderProps = {
            id: v4(), customerId: v4(), items: [
                { id: v4(), name: "any", productId: v4(), quantity: 1, price: 100}
            ]
        }

        const order = OrderFactory.create(orderProps)

        expect(order).toBeDefined()
        expect(order.customer()).toBeDefined()
        expect(order.items()[0]).toBeDefined()
        expect(order.items()[0].name()).toBe("any")
    })

})