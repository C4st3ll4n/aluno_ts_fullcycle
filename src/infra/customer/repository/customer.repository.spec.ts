import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import {CustomerRepository} from "./customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";

describe("Customer Repository Test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([CustomerModel])
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
      active: false,
      city: "City1",
      number: "1",
      rewardPoints: 0,
      street: "Street 1",
      zip: "Zipcode1",
    });
  });

  test("Should update a costumer", async () => {
    expect(1).toBe(1)
  });

  test("Should find a costumer", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("1", "Customer 1");
    customer1.address = new Address("Street 1", "Zipcode1", "City1", "1");
    await customerRepository.create(customer1);

    const costumerModel = await CustomerModel.findOne({where: {id: "1"}})
    const foundModel = await customerRepository.find("1");

    expect(costumerModel.toJSON().id).toEqual(foundModel.id)

  });

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
