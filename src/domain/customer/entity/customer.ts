import Address from "../value-object/address";

export default class Customer {

    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;
    _rewardPoints: number = 0;

    constructor(id: string, name:string) {
        this._id = id;
        this._name = name
        this.validate()
    }

    validate(){
        if(this._name.length===0){
            throw new Error("Name is required");
        }
        if(this._id.length===0){
            throw new Error("Id is required");
        }
    }

    set name(name:string){
        this._name = name;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get isActive(): boolean{
        return this._active;
    }

    set address(address:Address){
        this._address = address;
    }

    get rewardPoints(){
        return this._rewardPoints;
    }

    changeName(name: string){
        this._name = name;
        this.validate()
    }

    activate(){
        if(this._address === undefined){
            throw new Error("Address is mandatory to activate");
        }
        this._active = true;
    }

    deactivate(){
        this._active=false;
    }

    addRewardPoints(points:number){
        this._rewardPoints += points;
    }
}