import express from "express";
import CreateProductUsecase from "../../../domain/usecase/product/create/create.product.usecase";
import { ProductRepository } from "../../product/repository/product.repository";
import { InputCreateProductDTO } from "../../../domain/usecase/product/create/create.product.dto";
import ListProductUsecase from "../../../domain/usecase/product/list/list.product.usecase";

export const productRoute = express.Router();

productRoute.post("/", async (req,res)=>{
    const usecase = new CreateProductUsecase(new ProductRepository());
    try {
        const {name, price} = req.body;
        const input: InputCreateProductDTO = {
            name: name,
            price:price
        };
        const output = await usecase.execute(input);
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})

productRoute.get("/", async (req,res)=>{
    const usecase = new ListProductUsecase(new ProductRepository());
    try {
        const output = await usecase.execute({});
        res.send(output);
    } catch (error) {
        res.status(500).send(error)
    }
})