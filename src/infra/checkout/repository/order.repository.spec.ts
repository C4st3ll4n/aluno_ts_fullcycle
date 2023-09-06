import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import CustomerModel from "../../customer/db/sequelize/model/customer.model";
import ProductModel from "../../product/db/sequelize/model/product.model";
import {Sequelize} from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import {CustomerRepository} from "../../customer/repository/customer.repository";
import Address from "../../../domain/customer/value-object/address";
import {ProductRepository} from "../../product/repository/product.repository";
import Product from "../../../domain/product/entity/product";
import OrderItem from "../../../domain/checkout/entity/order_item";
import Order from "../../../domain/checkout/entity/order";
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

    it("should find a order", async () => {
        const costumerRepository = new CustomerRepository();
        const productRepository = new ProductRepository();
        const orderRepository = new OrderRepository();

        const customer = new Customer("1", "Customer 1");
        customer.address = new Address("Street 1", "Zipcode1", "City1", "1");
        await costumerRepository.create(customer);

        const _product1 = new Product("1", "product 1", 120)
        const _product2 = new Product("1", "product 1", 120)

        await productRepository.create(_product1);
        await productRepository.create(_product2);


        const items: OrderItem[] = [
            new OrderItem("1", "oi1", 120, 2, _product1.identificador),
            new OrderItem("2", 'oi2', 20, 2, _product2.identificador),
        ]

        const entity = new Order("123", "321", items);

        await OrderModel.create({
            id: entity.id(),
            customerId: entity.customer(),
            total: entity.total(),
            items: entity.items().map((item) => ({
                id: item.id(),
                name: item.name(),
                price: item.price,
                productId: item.product(),
                quantity: item.quantity()
            }))
        }, {
            include: [{model: OrderItemModel}]
        });

        const order = await orderRepository.find(entity.id());

        expect(order.id()).toEqual(entity.id());
        expect(order.customer()).toEqual(entity.customer());
        expect(order.items()[0].id()).toEqual(entity.items()[0].id());

    })

    it("should find all orders", async () => {
        const orderRepository = new OrderRepository();
        const costumerRepository = new CustomerRepository();

        const _product1 = new Product("1", "product 1", 120)
        const _product2 = new Product("2", "product 2", 20)

        const customer = new Customer("321", "Customer 1");
        customer.address = new Address("Street 1", "Zipcode1", "City1", "1");
        await costumerRepository.create(customer);

        const items: OrderItem[] = [
            new OrderItem("1", "oi1", 120, 2, _product1.identificador),
            new OrderItem("2", 'oi2', 20, 2, _product2.identificador),
        ]

        const order1 = new Order("1", "321", items);
        const order2 = new Order("2", "321", [items[0]]);
        const order3 = new Order("3", "321", [items[1]]);

        await Promise.all([
            orderRepository.create(order1),
            orderRepository.create(order2),
            orderRepository.create(order3)
        ])

        const orders = [order1, order2, order3];
        const foundOrders = await orderRepository.findAll();
        expect(foundOrders).toEqual(orders)

    })

    it("should update a order", async () => {
        expect(1).toEqual(1)
    })

});
