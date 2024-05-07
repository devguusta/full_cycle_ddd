import Address from "../../customer/value-object/address";
import Customer from "../../customer/entity/customer";
import Order from "../../checkout/entity/order";
import OrderItem from "../../checkout/entity/order_item";
import Product from "./product";

describe("Product unit tests", () => {
    it("Should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow("product: Id is required");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("P1", "", 100);
        }).toThrow("product: Name is required");
    });

    it("Should throw error when price is less then 0", () => {
        expect(() => {
            const product = new Product("P1", "Product 1", -1);
        }).toThrow("product: Price most be greater than zero");
    });
    it("Should throw error when price is less then 0 and name and id is empty", () => {
        expect(() => {
            const product = new Product("", "", -1);
        }).toThrow("product: Id is required,product: Name is required,product: Price most be greater than zero");
    });

    it("Should  change name", () => {
        const product = new Product("P1", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toEqual("Product 2");
    });

    it("Should  change price", () => {
        const product = new Product("P1", "Product 1", 100);
        product.changePrice(200);
        expect(product.price).toEqual(200);
    });
});
