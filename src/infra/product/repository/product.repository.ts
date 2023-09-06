import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export class ProductRepository implements ProductRepositoryInterface{
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.identificador,
            name: entity.nome,
            price: entity.preco
        })
    }
    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.nome,
            price: entity.preco
        }, {
            where:{
                id: entity.identificador
            }
        })
    }
    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id }})
        return new Product(productModel.id, productModel.name, productModel.price);
    }
    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map((productModel):Product=>{
            return new Product(productModel.id, productModel.name, productModel.price);
        })
    }

}