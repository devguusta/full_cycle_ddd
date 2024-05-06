import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/product.model";
import Product from '../../../domain/product/entity/product';
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import UpdateProductUseCase from "./update.product.usecase";



describe("Update product integration test use case", () => {
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

    it("should update a Product", async () => {

        const product = new Product("SKU1239010", "Malbec", 200);

        // Arrange
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = { name: "Rexona", type: "b", price: 200, id: product.id } as const;
        const outputInterface = {
            id: expect.any(String),
            name: "Rexona",
            price: 400,
            type: "b",

        }

        const result = await new UpdateProductUseCase(productRepository).execute(input);
        expect(result).toEqual(outputInterface);

    });

});