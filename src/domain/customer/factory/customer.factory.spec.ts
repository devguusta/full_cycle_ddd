import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Customer factory test', () => { 

    it("Should create a customer", () => {
        let customer = CustomerFactory.create("Gustavo");
        expect(customer.name).toBe("Gustavo");
        expect(customer.id).toBeDefined();
        expect(customer.address).toBeUndefined();
    });


    it("Should create a customer with address", () => {

                let address =new Address("Rua", "city", "26140630", "83");
        let customer = CustomerFactory.createWithAddress("Gustavo", address);
        expect(customer.name).toBe("Gustavo");
        expect(customer.id).toBeDefined();
        expect(customer.address).toBe(address);

    });
 });