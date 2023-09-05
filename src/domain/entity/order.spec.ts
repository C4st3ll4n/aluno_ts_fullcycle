import Order from "./order";
import OrderItem from "./order_item";

describe("Order test",()=>{

    const item1 = new OrderItem("1", "Item1", 80, 1, "p1");
    const item2 = new OrderItem("2", "Item2", 20, 1, "p2");

    test("Should throw error when id is empty", ()=> {
        expect(()=>{
            let order = new Order("", "1", [item1, item2]);
        }).toThrowError("Id is required")
    })

    test("Should throw error when customerId is empty", ()=> {
        expect(()=>{
            let order = new Order("1", "", [item1, item2]);
        }).toThrowError("CustomerId is required")
    })

    test("Should throw error when items is empty", ()=> {
        expect(()=>{
            let order = new Order("1", "Pedro", []);
        }).toThrowError("Items is required")
    })

    test("Should total be correctly calculated", ()=> {
        let order = new Order("1", "Pedro", [item1, item2]);
        expect(order.total()).toBe(100);

        let item3 = new OrderItem("3", "item3", 100, 1, "p3")
        let order2 = new Order("1", "Pedro", [item1, item2, item3]);

        expect(order2.total()).toBe(200);
    })

})