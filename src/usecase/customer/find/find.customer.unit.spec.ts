import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";


const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", "City 1", "Zipcode 1", "1",);
        customer.changeAddress(address);

const MockRepository = () => {
    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockResolvedValue(customer),
        findAll: jest.fn(),
        delete: jest.fn(),
    };

}

describe("Find customer test use case", () => {


    it("should find a customer", async () => {

        
        // Arrange
        const customerRepository =MockRepository();
        await customerRepository.create(customer);

        const input = { id: "123" };
        const outputInterface = {
            id: "123",
            name: "Customer 1",
            address: {
                street: "Street 1",
                city: "City 1",
                number: "1",
                zip: "Zipcode 1",
            },
        }

        const result = await new FindCustomerUseCase(customerRepository).execute(input);
        expect(result).toEqual(outputInterface);

    });


    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found")
;        })
        const usecase = new FindCustomerUseCase(customerRepository);
        const input = { id: "123" };

        expect(() => {
            return usecase.execute(input);
        }).rejects.toThrow("Customer not found")
    })

});