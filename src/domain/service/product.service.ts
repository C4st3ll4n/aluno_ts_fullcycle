import Product from "../entity/product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number) {
        products.forEach(product => {
            const valueToIncrease = (product.preco * percentage) / 100 + product.preco
            product.changePrice(valueToIncrease)
        })
    }
}