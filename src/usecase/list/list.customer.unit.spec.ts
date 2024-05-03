import CustomerFactory from "../../domain/customer/factory/customer.factory";
import Address from "../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John",
  new Address("Street", "city", "zip", "number")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane 2",
  new Address("Street 2", "city 2", "zip 2", "number")
);

const input = {};
const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
};

describe("Unit test for list customer usecase", () => {
  it("Should find all customers", async () => {
    const customerRepository = MockRepository();
    const usecase = new ListCustomerUseCase(customerRepository);

    const output = await usecase.execute(input);

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);
    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
  });
});
