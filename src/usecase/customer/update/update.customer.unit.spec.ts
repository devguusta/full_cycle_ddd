import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress("John", new Address("Street", "city", "zip","number"));

const input = {
    id: customer.id,
    name: "Gustavin",
    address: {
        street: "Street 1",
        city: "City 1",
        zip: "Zip 1",
        number: "Number 1",
      },
};

const MockRepository = () => {
    return {
      find: jest.fn().mockResolvedValue(customer),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  };


  describe('Unit test for customer update usecase', () => { 
    it("Should update a customer", async () => {
        const customerRepository =MockRepository();
        const usecase = new UpdateCustomerUseCase(customerRepository);


        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    })
   })