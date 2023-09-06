export default class Address{
    _street:string;
    _zip: string;
    _city: string;
    _number: string;

    constructor(street: string, zip: string, city: string, houseNumber: string){
        this._street = street;
        this._zip = zip;
        this._city = city;
        this._number = houseNumber;
    }
}