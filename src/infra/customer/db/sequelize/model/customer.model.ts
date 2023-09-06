import {Column, PrimaryKey, Table, Model} from "sequelize-typescript";

@Table({
    tableName:"customers",
    timestamps: false
})
export default class CustomerModel extends Model{
    @PrimaryKey
    @Column
    declare id: string;

    @Column({allowNull: false})
    declare name: string;

    @Column({allowNull: false})
    declare street:string;

    @Column({allowNull: false})
    declare zip: string;

    @Column({allowNull: false})
    declare city: string;

    @Column({allowNull: false})
    declare number: string;

    @Column({allowNull: false})
    active: boolean = false;

    @Column({allowNull: false})
    rewardPoints: number = 0;
}