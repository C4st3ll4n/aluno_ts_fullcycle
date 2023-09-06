import ProductInterface from "../entity/product.interface";
import Product from "../entity/product";
import {v4} from "uuid";

export default class ProductFactory {
    public static create(name:string, price:number): ProductInterface {
        return new Product(v4(), name, price);
    }
}