export interface InputListProductDTO {}

export interface OutputListProductDTO {
    products: OutputProduct[]
}

export type OutputProduct = {
    id: string;
    name: string;
    price: number;
}