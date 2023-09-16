export interface InputCreateCustomerDTO{
    name: string
    address:{
        street: string,
        city: string,
        zipcode: string,
        houseNumber: string,
    }
}

export interface OutputCreateCostumerDTO{
    id: string
    name: string
    address:{
        street: string,
        city: string,
        zipcode: string,
        houseNumber: string,
    }
}