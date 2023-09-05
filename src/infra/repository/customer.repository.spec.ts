import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import {CustomerRepository} from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    });
    sequelize.modelManager.addModel(CustomerModel);
    //console.log(sequelize.modelManager.all.toString())
    //console.log(sequelize.models)
    await sequelize.sync();
  });

  afterEach(async () => {
    sequelize.close();
  });

  test("Should create a new customer", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1", "Customer 1");
    customer1.address = new Address("Street 1", "Zipcode1", "City1", "1");
    await customerRepository.create(customer1);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });
    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
    });
  });

  test("Should update a product", async () => {});

  test("Should find a product", async () => {});

  test("Should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1", "Customer 1");
    customer1.address = new Address("Street 1", "Zipcode1", "City1", "1");
    await customerRepository.create(customer1);

    const customer2 = new Customer("2", "Customer 2");
    customer2.address = new Address("Street 2", "Zipcode2", "City2", "2");
    await customerRepository.create(customer2);

    const customer3 = new Customer("3", "Customer 3");
    customer3.address = new Address("Street 3", "Zipcode3", "City3", "3");
    await customerRepository.create(customer3);

    const foundCustomers = await customerRepository.findAll();
    const customers = [customer1, customer2, customer3];

    expect(customers).toEqual(foundCustomers);
  });
});
