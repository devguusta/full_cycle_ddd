import { sequelize, app } from '../express'
import request from "supertest";

describe("E2E test for product", () => {


    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });


    it("Should create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Malbec",
            price: 200,
            type: "a",


        });

        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual("Malbec");
        expect(response.body.price).toEqual(200);
        expect(response.body.type).toEqual("a");

    });

    it("Should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Malbec",
            type: "a",


        });
        expect(response.statusCode).toEqual(500);

    });

    it("Should list all products", async () => {
        const response = await request(app).post("/product").send({
            name: "Malbec",
            price: 200,
            type: "a"


        });
        const response2 = await request(app).post("/product").send({
            name: "Rexona",
            price: 10,
            type: "b",


        });

        expect(response2.statusCode).toEqual(200);

        const listResponse = await request(app).get("/product").send();
        expect(listResponse.statusCode).toEqual(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        const product2 = listResponse.body.products[1];
        expect(product.name).toBe("Malbec");
        expect(product.price).toBe(200);

        expect(product2.name).toBe("Rexona");
        expect(product2.price).toBe(20);

    });
});