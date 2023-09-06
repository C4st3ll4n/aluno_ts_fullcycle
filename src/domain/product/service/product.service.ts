import Product from "../entity/product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number) {
        products.forEach(product => {
            const valueToIncrease = (product.price * percentage) / 100 + product.price
            product.changePrice(valueToIncrease)
        })
    }
}