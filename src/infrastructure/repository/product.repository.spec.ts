import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {

    let sequelize: Sequelize;


    beforeEach(async () => {
        sequelize = new Sequelize(
            {
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
                sync: { force: true }

            }
        );
      sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    }
    );

    it("should create a product", async () => {

        const productRepository = new ProductRepository();

        const product = new Product("p1", "Produto 1", 100);

        await productRepository.create(product);
       

        const productModel = await ProductModel.findOne({ where: { id: product.id } });

        expect(productModel.toJSON()).toStrictEqual(
            {
                id: "p1",
                name: "Produto 1",
                price: 100
            }

        )
    });

    it("should update a product", async () => {
            
            const productRepository = new ProductRepository();
    
            const product = new Product("p1", "Produto 1", 100);
    
            await productRepository.create(product);
    
            product.changeName("Produto 2");
            product.changePrice(200);
    
            await productRepository.update(product);
    
            const productModel = await ProductModel.findOne({ where: { id: product.id } });
    
            expect(productModel.toJSON()).toStrictEqual(
                {
                    id: "p1",
                    name: "Produto 2",
                    price: 200
                }
    
            )
        });

        it("should find a product", async () => {

            const productRepository = new ProductRepository();
    
            const product = new Product("p1", "Produto 1", 100);
    
            await productRepository.create(product);
    
            const productFind = await productRepository.find("p1");
    
            expect(productFind).toStrictEqual(product);
            
        });

        it("should delete a product", async () => {

            const productRepository = new ProductRepository();
    
            const product = new Product("p1", "Produto 1", 100);
    
            await productRepository.create(product);
    
            await productRepository.delete("p1");
    
            const productModel = await ProductModel.findOne({ where: { id: product.id } });
    
            expect(productModel).toBeNull();
            
        });

        it("should find all products", async () => {

            const productRepository = new ProductRepository();
    
            const product1 = new Product("p1", "Produto 1", 100);
            const product2 = new Product("p2", "Produto 2", 200);
    
            await productRepository.create(product1);
            await productRepository.create(product2);
    
            const products = await productRepository.findAll();
    
            expect(products).toStrictEqual([product1, product2]);
            
        });
    
});