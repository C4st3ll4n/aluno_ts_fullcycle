import Product from "../entity/product"
import ProductService from "./product.service"

describe("Product service tests", ()=> {
    it("Should change the price of all products", ()=> {
        const product1 = new Product("pd1", "Product 1", 50)
        const product2 = new Product("pd2", "Product 2", 100)
        const products = [product1, product2]

        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(100)
        expect(product2.price).toBe(200)
    })
})