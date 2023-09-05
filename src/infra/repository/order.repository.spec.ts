import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import {CustomerRepository} from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import {ProductRepository} from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import {OrderRepository} from "./order.repository";

describe("Order Repository Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory",
            logging: false,
            sync: {force: true},
        });
        sequelize.modelManager.addModel(OrderModel);
        sequelize.modelManager.addModel(OrderItemModel);
        sequelize.modelManager.addModel(CustomerModel);
        sequelize.modelManager.addModel(ProductModel);
        await sequelize.sync();
    });

    afterEach(async () => {
        sequelize.close();
    });

    it("should create a new order", async () => {
        const costumerRepository = new CustomerRepository();

        const customer = new Customer("1", "Customer 1");
        customer.address = new Address("Street 1", "Zipcode1", "City1", "1");
        costumerRepository.create(customer);

        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.nome, product.preco, 2, product.identificador)

        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({
            where: {
                id: order.id(),
                include: ['items']
            }
        })

        expect(orderModel.toJSON()).toStrictEqual({
            id:order.id(),
            customerId:customer.id,
            total:order.total(),
            items: [{
                id: orderItem.id,
                name:orderItem.name,
                price:orderItem.price,
                quantity:orderItem.quantity,
                productId:orderItem.product(),
                orderId:order.id()
            }]
        })
    })

});
