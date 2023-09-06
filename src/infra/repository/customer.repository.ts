import Address from "../../domain/customer/value-object/address";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
      street: entity.address._street,
      number: entity.address._number,
      zipcode: entity.address._zip,
      city: entity.address._city,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
        street: entity.address._street,
        number: entity.address._number,
        zipcode: entity.address._zip,
        city: entity.address._city,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await CustomerModel.findOne({ where: { id } });
    const customer = new Customer(customerModel.id, customerModel.name);
    customer._rewardPoints = customerModel.rewardPoints;
    customer._active = customerModel.active;
    customer._address = new Address(
      customerModel.street,
      customerModel.zip,
      customerModel.city,
      customerModel.number
    );
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customerModel): Customer => {
      const customer = new Customer(customerModel.id, customerModel.name);
      customer._rewardPoints = customerModel.rewardPoints;
      customer._active = customerModel.active;
      customer._address = new Address(
        customerModel.street,
        customerModel.zip,
        customerModel.city,
        customerModel.number
      );
      return customer;
    });
  }
}
