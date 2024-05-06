import { sequelize, app } from '../express'
import request from "supertest";

describe("E2E test for customer", () => {


    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("Should create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: "123",
                zip: "12345"
            }

        });

        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual("John");
        expect(response.body.address.street).toEqual("Street");

    });

    it("Should not create a customer", async () => {
        const response = await request(app).post("/customer").send({
            name: "John",


        });
        expect(response.statusCode).toEqual(500);

    });

    it("Should list all customers", async () => {
        const response = await request(app).post("/customer").send({
            name: "John",
            address: {
                street: "Street",
                city: "City",
                number: "123",
                zip: "12345"
            }

        });
        const response2 = await request(app).post("/customer").send({
            name: "Jane",
            address: {
                street: "Street",
                city: "City",
                number: "123",
                zip: "12345"
            }

        });

        expect(response2.statusCode).toEqual(200);

        const listResponse = await request(app).get("/customer").send();
        expect(listResponse.statusCode).toEqual(200);
        expect(listResponse.body.customers.length).toBe(2);
        const customer = listResponse.body.customers[0];
        const customer2 = listResponse.body.customers[1];
        expect(customer.name).toBe("John");
        expect(customer2.name).toBe("Jane");
    });
});