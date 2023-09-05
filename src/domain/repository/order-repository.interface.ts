import Customer from "../entity/customer"; 
import RepositoryInterface from "./repository-interface";
import Order from "../entity/order";

export default interface OrderRepositoryInterface extends RepositoryInterface<Order>{
}