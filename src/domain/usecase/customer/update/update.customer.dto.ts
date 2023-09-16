export interface InputUpdateCustomerDto {
    id: string
    name: string
    address: {
        street: string,
        city: string,
        zipcode: string,
        houseNumber: string,
    }
}

export interface OutputUpdateCustomerDto {
    id: string
    name: string
    address: {
        street: string,
        city: string,
        zipcode: string,
        houseNumber: string,
    }
}