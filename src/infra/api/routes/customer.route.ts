import express, { Request, Response } from "express";
import CreateCustomerUsecase from "../../../domain/usecase/customer/create/create.customer.usecase";
import { CustomerRepository } from "../../customer/repository/customer.repository";
import { InputCreateCustomerDTO } from "../../../domain/usecase/customer/create/create.customer.dto";
import { ListCustomerUsecase } from "../../../domain/usecase/customer/list/list.customer.usecase";

export const customerRoute = express.Router();

customerRoute.post("/", async (req, res) => {
  const usecase = new CreateCustomerUsecase(new CustomerRepository());
  try {
    const { name, address } = req.body;
    const customerInputDto: InputCreateCustomerDTO = {
      name: name,
      address: {
        city: address.city,
        houseNumber: address.number,
        street: address.street,
        zipcode: address.zip,
      },
    };

    const outputCustomer = await usecase.execute(customerInputDto);
    res.send(outputCustomer);
  } catch (e) {
    res.status(500).send(e);
  }
});

customerRoute.get("/", async(req, res)=>{
  const usecase = new ListCustomerUsecase(new CustomerRepository());
  
  try{
    const output = await usecase.execute();
    console.log(output)
    res.send(output);
  }catch(e){
    res.status(500).send(e);
  }
});
