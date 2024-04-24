import Address from "./address";
import Customer from "./customer";
import Order from "./order";
import OrderItem from "./order_item";

describe("order unit tests", () => {

    it("Should throw error when id is empty", () => {


        expect(() => {
            new Order("", "123", []);
        }).toThrow('Id is required');
    });

    it("Should throw error when customerid is empty", () => {


        expect(() => {
            new Order("123", "", []);
        }).toThrow('CustomerId is required');
    });

    it("Should throw error when items is empty", () => {


        expect(() => {
            new Order("123", "1231231231", []);
        }).toThrow('Item qtd must be greate than 0');
    });


    it("Should calculate total", () => {


     const item = new OrderItem('I1', 'Item 1', 100, 1);
     const item2 = new OrderItem('I2', 'Item 2', 250, 2);
     const order = new Order('o1', "c1", [item])
     let total = order.total();
     expect(total).toBe(100);

     const order2 = new Order('o2', "c2", [item, item2])
     total = order2.total();
     expect(total).toBe(600);
    });


});