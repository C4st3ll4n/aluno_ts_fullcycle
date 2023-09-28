import request from "supertest";
import { sequelize, app } from "../express"

describe("E2E Customer's test", ()=>{

    beforeAll(async ()=>{
        await sequelize.sync({
            logging: false,
            force:true})
    
    })

    afterAll(async ()=>{
        await sequelize.close();
    })
    
    it("Should create a new customer", async()=>{
        const response = await request(app)
        .post("/customer")
        .send({
            name:"Jhon",
            address:{
                street:"Street",
                city: "City",
                number: 123,
                zip: "12312332"
            }
        });
        expect(response.status).toBe(200)
        expect(response.body.name).toBe("Jhon")
        expect(response.body.address.city).toBe("City")
    })

    
    it("Should return a 500", async()=>{
        const response = await request(app)
        .post("/customer")
        .send({
            name:"",
            address:{
                street:"Street",
                city: "City",
                number: 123,
                zip: "12312332"
            }
        });
        expect(response.status).toBe(500)
    })

    it("Should return a lis of customer", async()=>{
        const firstResponse = await request(app)
        .post("/customer")
        .send({
            name:"Jhon",
            address:{
                street:"Street",
                city: "City",
                number: 123,
                zip: "12312332"
            }
        });

        expect(firstResponse.status).toBe(200)
        expect(firstResponse.body.name).toBe("Jhon")
        expect(firstResponse.body.address.city).toBe("City")
        
        const secondResponse = await request(app)
        .post("/customer")
        .send({
            name:"Doe",
            address:{
                street:"Street2",
                city: "City2",
                number: 1232,
                zip: "123123324"
            }
        });

        expect(secondResponse.status).toBe(200)
        expect(secondResponse.body.name).toBe("Doe")
        expect(secondResponse.body.address.city).toBe("City2")

        const response = await request(app)
        .get("/customer");

        expect(response.status).toBe(200)
        expect(response.body).toBeTruthy()
        expect(response.body.customers).toBeTruthy()
        expect(response.body.customers.length).toBe(3)
        expect(response.body.customers[1].name).toBe("Jhon")
        expect(response.body.customers[2].address.city).toBe("City2")

        
        const xmlResponse = await request(app)
        .get("/customer")
        .set("Accept", "application/xml")
        .send();

        expect(xmlResponse.status).toEqual(200);
        expect(xmlResponse.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
        expect(xmlResponse.text).toContain(`<customers>`)
        expect(xmlResponse.text).toContain(`<customer>`)
        expect(xmlResponse.text).toContain(`<address>`)
        expect(xmlResponse.text).toContain(`<name>Jhon</name>`)
        expect(xmlResponse.text).toContain(`<name>Doe</name>`)
        expect(xmlResponse.text).toContain(`<city>City2</city>`)
    })

})