import Entity from "../../shared/entity/entity.abstract";
import NotificationError from "../../shared/notification/notification.error";
import ProductInterface from "./product.interface";

export default class Product extends Entity implements ProductInterface{
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        super(id);
        this._name = name;
        this._price = price;
        this.validate()

        if(this.notification.hasErrors()){
            throw new NotificationError(this.notification.getErrors())
        }
    }
    validate() {
        if (this.id.length === 0) {
            this.notification.addError({
                context:"product",
                message:"Id is required"
            })
        }
        if (this.name.length === 0) {
            this.notification.addError({
                context:"product",
                message:"Name is required"
            })
        }
        if (this.price===undefined||this.price<=0) {
            this.notification.addError({
                context:"product",
                message:"Price is required and bigger than 0"
            })
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

    get identificador():string{
        return this.id;
    }
}