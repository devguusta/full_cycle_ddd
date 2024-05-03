import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/product.model";
import Product from '../../../domain/product/entity/product';
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import CreateCustomerUseCase from "../../customer/create/create.customer.usecase";
import CreateProductUseCase from "./create.product.usecase";


describe("Create product integration test use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a Product", async () => {

        const product = new Product("SKU1239010", "Malbec", 200);

        // Arrange
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = { name: "Malbec", type: "a", price: 200 } as const;
        const outputInterface = {
            id: expect.any(String),
            name: "Malbec",
            price: 200,
            type: "a",

        }

        const result = await new CreateProductUseCase(productRepository).execute(input);
        expect(result).toEqual(outputInterface);

    });

});