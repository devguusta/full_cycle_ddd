import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindAllProducts, OutputFindAllProducts } from "./findall.products.dto";

export default class FindAllProductsUseCase {

    private productRepository: ProductRepositoryInterface;


    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    };


    async execute(input: InputFindAllProducts): Promise<OutputFindAllProducts> {

        const products = await this.productRepository.findAll();

        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price,
            }))
        };

    }
}