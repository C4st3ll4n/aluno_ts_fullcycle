export default class OrderItem {

    private _id: string;
    private _productId: string;
    private _name: string;
    private _price: number;
    private _quantity: number;

    constructor(id: string, name: string, price: number, quantity: number, productId: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._productId = productId;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
    }

    get price(): number {
        return this._price;
    }

    id(): string {
        return this._id;
    }

    name(): string {
        return this._name;
    }

    quantity(): number {
        return this._quantity
    }

    product(): string {
        return this._productId;
    }


}