import Customer from "../../customer/entity/customer";
import Order from "../entity/order"
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe("Order Service tests", ()=>{
    it("Should get total of all orders",()=>{

        const orderItem1 = new OrderItem("1", "1", 10, 1, "1");
        const orderItem2 = new OrderItem("2", "2", 20, 1, "1");
        const orderItem3 = new OrderItem("3", "3", 30, 1, "1");
        const orderItem4 = new OrderItem("4", "4", 40, 1, "1");

        const order1 = new Order("ord1", "cus1", [orderItem1, orderItem4]);
        const order2 = new Order("ord1", "cus1", [orderItem2, orderItem3])

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(100)
    })

    it("should place an order", ()=> {
        const customer = new Customer("id1", "name1")
        const orderItem1 = new OrderItem("1", "item1", 10, 1, "1");
        const order = OrderService.placeOrder(customer, [orderItem1])

        expect(customer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)
    })
})