export default class Product {
    private readonly id: string;
    private name: string;
    private price: number;

    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.validate()
    }
    validate() {
        if (this.id.length === 0 || this.id === undefined) {
            throw new Error("Id is required.");
        }
        if (this.name.length === 0 || this.name === undefined) {
            throw new Error("Name is required.");
        }
        if (this.price<=0) {
            throw new Error("Price is required and bigger than 0.");
        }
    }

    changeName(newName:string):void{
        this.name = newName;
        this.validate()
    }

    changePrice(newPrice:number):void{
        this.price = newPrice;
        this.validate()
    }

    get nome():string{
        return this.name;
    }

    get preco():number{
        return this.price;
    }

    get identificador():string{
        return this.id;
    }
}