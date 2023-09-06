import ProductInterface from "./product.interface";

export default class Product implements ProductInterface{
    private readonly _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate()
    }
    validate() {
        if (this.id.length === 0) {
            throw new Error("Id is required.");
        }
        if (this.name.length === 0) {
            throw new Error("Name is required.");
        }
        if (this.price<=0) {
            throw new Error("Price is required and bigger than 0.");
        }
    }

    changeName(newName:string):void{
        this._name = newName;
        this.validate()
    }

    changePrice(newPrice:number):void{
        this._price = newPrice;
        this.validate()
    }

    get name():string{
        return this._name;
    }

    get price():number{
        return this._price;
    }

    get id():string{
        return this._id;
    }
}