import {Column, PrimaryKey, Table, Model, ForeignKey, BelongsTo} from "sequelize-typescript";
import CustomerModel from "./customer.model";
import ProductModel from "./product.model";
import OrderModel from "./order.model";

@Table({
    tableName:"orders_items",
    timestamps: false
})
export default class OrderItemModel extends Model{
    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull:false})
    declare name: string;

    @Column({allowNull:false})
    declare quantity: number;

    @Column({allowNull:false})
    declare price: number;

    @ForeignKey(()=>ProductModel)
    @Column({allowNull:false})
    declare productId: string;

    @BelongsTo(()=>ProductModel)
    declare product: ProductModel

    @ForeignKey(()=>OrderModel)
    @Column({allowNull:false})
    declare orderId: string;

    @BelongsTo(()=>OrderModel)
    declare order: OrderModel

}