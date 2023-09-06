import ProductFactory from "./product.factory";

describe("Product Factory Unit test", ()=>{
    it("Should create a product", ()=>{
        const product = ProductFactory.create("product a", 1)
        expect(product.id).toBeDefined()
        expect(product.name).toBe("product a")
        expect(product.price).toBe(1)
        expect(product.constructor.name).toBe("Product")
    })
})