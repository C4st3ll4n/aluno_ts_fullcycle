import Customer from "./domain/customer/entity/customer";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";

let customer = new Customer("123", "Pedro");
const address = new Address("Rua A", "12345-678", "São Paulo", "51")

customer.address = address;
customer.activate()

const item1 = new OrderItem("1", "Item 1", 123);
const item2 = new OrderItem("2", "Item 2", 321);

const order = new Order("1", "123", [item1, item2]);56