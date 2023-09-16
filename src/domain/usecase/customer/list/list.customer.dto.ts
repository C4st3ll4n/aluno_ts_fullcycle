export type OutputCustomer = {
    id: string
    name: string
    address: {
        street: string,
        city: string,
        zipcode: string,
        houseNumber: string,
    }
}
export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
    customers : OutputCustomer[]
}