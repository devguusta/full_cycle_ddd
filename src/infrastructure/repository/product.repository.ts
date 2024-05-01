import { where } from "sequelize";
import Product from "../../domain/product/entity/product";
import ProductRepositoryInterface from "../../domain/product/repository/product-repository.interface";
import ProductModel from "../db/sequelize/model/product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async  findAll(): Promise<Product[]> {
        const productsModel = await ProductModel.findAll();
        return productsModel.map(productModel =>
             new Product(productModel.id, productModel.name, productModel.price));
    }
   async  find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id: id } });
        return new Product(productModel.id, productModel.name, productModel.price);
    }
   async create(data: Product): Promise<void> {
    await ProductModel.create({
 
        id: data.id,
        name: data.name,
        price: data.price
    });
    }
   async  update(data: Product): Promise<void> {
        await ProductModel.update({
            name: data.name,
            price: data.price
        },
            {
                where: {
                    id: data.id
                }
            });
      
    }
    async delete(id: string): Promise<boolean> {
        const productModel = await ProductModel.findOne({ where: { id: id } });
        if (productModel) {
            await productModel.destroy();
            return true;
        }
        return false;
    }
}