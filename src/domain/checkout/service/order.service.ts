import { v4 } from "uuid";
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0)
    }

    static placeOrder(customer: Customer, items:OrderItem[]):Order{
        if(items.length === 0){
            throw new Error("Order must have at leat one item");
        }

        const order = new Order(v4(), customer.identificador, items);
        customer.addRewardPoints(order.total()/2);
        return order;
    }
}