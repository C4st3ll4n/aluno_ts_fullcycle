import Customer from "../entity/customer";
import {v4} from "uuid";
import Address from "../value-object/address";

export default class CustomerFactory {
    public static create(name: string, address?: Address): Customer {
        const customer = new Customer(v4(), name);
        if (address !== undefined) {
            customer.address = address
        }
        return customer;
    }
}