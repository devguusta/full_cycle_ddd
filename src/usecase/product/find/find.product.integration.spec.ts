import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/product.model";
import Product from '../../../domain/product/entity/product';
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import FindProductUseCase from "./find.product.usecase";


describe("Find product integration test use case", () => {
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

    it("should find a Product", async () => {

        const product = new Product("SKU1239010", "Malbec", 200);


        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const input = { id: "SKU1239010" } as const;
        const outputInterface = {
            id: "SKU1239010",
            name: "Malbec",
            price: 200,


        }

        const result = await new FindProductUseCase(productRepository).execute(input);
        expect(result).toEqual(outputInterface);

    });

});