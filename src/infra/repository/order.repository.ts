import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";

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
        return Promise.resolve(undefined);
    }

    async findAll(): Promise<Order[]> {
        return Promise.resolve([]);
    }

    async update(entity: Order): Promise<void> {
        return Promise.resolve(undefined);
    }

}