import request from "supertest";
import { sequelize, app } from "../express"

describe("Product E2E test", ()=>{
    
    beforeAll(async ()=>{
        await sequelize.sync({force:true})
    })

    afterAll(async ()=>{
        await sequelize.close();
    })
    
    it("Should create a new product", async()=>{
        const response = await request(app)
        .post("/product")
        .send({
            name: "Product 1",
            price: 250.00
        });
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Product 1")
        expect(response.body.price).toBe(250.00)
    })

    
    it("Should return a 500", async()=>{
        const response = await request(app)
        .post("/product")
        .send({
            name: "Product 1",
            price: null
        });
        expect(response.status).toBe(500)
    })

    it("Should return a lis of products", async()=>{
        const firstResponse = await request(app)
        .post("/product")
        .send({
            name: "Product 2",
            price: 20.00
        });
        
        const secondResponse = await request(app)
        .post("/product")
        .send({
            name: "Product 3",
            price: 2.00
        });

        const response = await request(app)
        .get("/product");

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
        expect(response.body.products).toBeTruthy()
        expect(response.body.products.length).toBe(3)
        expect(response.body.products[0].name).toBe("Product 1")
        expect(response.body.products[1].name).toBe("Product 2")
        expect(response.body.products[2].name).toBe("Product 3")
    })

})