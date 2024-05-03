import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/product.model";
import Product from '../../../domain/product/entity/product';
import ProductRepository from "../../../infrastructure/product/repository/product.repository";
import FindAllProductsUseCase from "./findall.products.usecase";



describe("Find all product integration test use case", () => {
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
        const product2 = new Product("SKU1239011230", "Natura", 20);


        const productRepository = new ProductRepository();
        await productRepository.create(product);
        await productRepository.create(product2);

        const input = {} as const;
        const outputInterface = {
            "products": [
                {
                    id: "SKU1239010",
                    name: "Malbec",
                    price: 200,


                },
                {
                    id: "SKU1239011230",
                    name: "Natura",
                    price: 20,


                }
            ]
        }

        const result = await new FindAllProductsUseCase(productRepository).execute(input);
        expect(result).toEqual(outputInterface);

    });

});