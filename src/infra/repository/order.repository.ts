import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";

export class OrderRepository implements  OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id(),
            customerId: entity.customer(),
            total: entity.total(),
            items: entity.items().map((item)=>({
                id: item.id(),
                name: item.name(),
                price: item.price,
                productId: item.product(),
                quantity: item.quantity()
            }))
        }, {
            include: [{model: OrderItemModel}]
        });
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne(
            {where: {id}}
        )

        return new Order(orderModel.id, orderModel.customerId, orderModel.items.map((item): OrderItem => {
            return new OrderItem(item.id, item.name, item.price, item.quantity, item.productId);
        }));
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll();
        return orderModels.map((orderModel): Order => {
            return new Order(orderModel.id, orderModel.customerId, orderModel.items.map((item): OrderItem => {
                return new OrderItem(item.id, item.name, item.price, item.quantity, item.productId);
            }));
        })
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update({
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
            where: {
                id: entity.id()
            }
        })
    }

}