import Address from "./address";
import Customer from "./customer";

describe("customer unit tests", () => {

    it("Should throw error when id is empty", () => {


        expect(() => {
            new Customer("", "name");
        }).toThrow('Id is required');
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            new Customer("id", "");
        }).toThrow('Name is required');
    });

    it("Should change name", () => {
        const customer = new Customer("id", "name");
        expect(customer.name).toBe("name");

        customer.changeName("new name");
        expect(customer.name).toBe("new name");
    });


    it("Should activate customer", () => {
        const customer = new Customer("id", "name");
       const address = new Address(
        "Rua dois",
        "Belford Roxo",
        
        "26140-630",
        "83"
    );
    customer.Address = address;
    customer.activate();
    expect(customer.isActive).toBe(true);
    });

    it("Shouldthrow error when call activate and address is undefined", () => {
      

        expect(() => {
            const customer = new Customer("id", "name");
            customer.activate();
        }).toThrow('Address is mandatory to activate a customer');
     
   
   expect
    });

    it("Should activate customer", () => {
        const customer = new Customer("id", "name");
     
    customer.deactivate();
    expect(customer.isActive).toBe(false);
    });

    it("Should add reward points", () => {
        const customer = new Customer("id", "name");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(200);

    });


});