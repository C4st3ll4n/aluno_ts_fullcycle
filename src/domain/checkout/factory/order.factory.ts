import Order from "../entity/order";
import OrderItem from "../entity/order_item";

export default class OrderFactory {
    public static create(orderProps: OrderFactoryProps): Order {
        return new Order(orderProps.id, orderProps.customerId, orderProps.items.map(makeOrderItem));
    }
}

function makeOrderItem(propsItem: any): OrderItem {
    return new OrderItem(propsItem.id, propsItem.name, propsItem.price, propsItem.quantity, propsItem.quantity);
}

interface OrderFactoryProps {
    id: string,
    customerId: string,
    items: {
        id: string,
        name: string,
        productId: string,
        quantity: number,
        price: number
    }[]

}