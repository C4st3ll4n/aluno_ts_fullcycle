import Product from "./product"

// tslint:disable:no-unused-expression
describe("Product test", () => {
    it("Should throw error when id is empty", ()=> {
        expect(()=>{
            new Product("", "Produtineo", 150)
        }).toThrowError("Id is required")
    })

    it("Should throw error when price is invalid", ()=> {
        expect(()=>{
            new Product("1", "Produtineo",-50)
        }).toThrowError("Price is required and bigger than 0.")
    })

    it("Should throw error when name is empty", ()=> {
        expect(()=>{
            new Product("1", "", 150)
        }).toThrowError("Name is required")
    })

    it("Should change name", ()=>{
        const product = new Product("1", "Produtineo", 150)
        product.changeName("Prod2");
        expect(product.name).toBe("Prod2")
    })

    it("Should change price", ()=>{
        const product = new Product("1", "Produtineo", 150)
        product.changePrice(200);
        expect(product.price).toBe(200)
    })
})