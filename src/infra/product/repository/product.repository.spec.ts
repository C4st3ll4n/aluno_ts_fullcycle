import { Sequelize } from "sequelize"
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../../domain/product/entity/product";
import { ProductRepository } from "./product.repository";

describe("Product Repository Test", ()=>{

    let sequelize: Sequelize

    beforeEach(async ()=>{
        sequelize = new Sequelize(
            {
                dialect:"sqlite",
                storage: ':memory',
                logging: false,
                sync: {force: true}
            }
        );
        sequelize.modelManager.addModel(ProductModel)
        await sequelize.sync();
    })

    afterEach(async()=>{
        sequelize.close()
    })

    test("Should create a new product", async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: "1"}})
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })
    });

    test("Should update a product", async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: "1"}})
        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 100
        })

        product.changeName("Product 2")
        product.changePrice(200)
        productRepository.update(product)

        const productModel2 = await ProductModel.findOne({ where: { id: "1"}})

        expect(productModel2.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 200
        })

    });

    test("Should find a product", async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product)

        const productModel = await ProductModel.findOne({ where: { id: "1"}})
        const foundProduct = await productRepository.find("1");

        expect(productModel.toJSON()).toStrictEqual({
            id: foundProduct.identificador,
            name: foundProduct.nome,
            price: foundProduct.preco
        })

    });

    test("Should find a product", async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product("1", "Product 1", 100);
        await productRepository.create(product)

        const product2 = new Product("2", "Product 2", 200);
        await productRepository.create(product2)

        const product3 = new Product("3", "Product 3", 300);
        await productRepository.create(product3)

        const foundProduct = await productRepository.findAll();
        const products = [product, product2, product3];

        expect(products).toEqual(foundProduct)
    });
})