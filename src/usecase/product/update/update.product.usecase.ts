import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {

    private productRepository: ProductRepositoryInterface;


    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    };


    async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = ProductFactory.create(input.type, input.name, input.price);
        await this.productRepository.update(product);

        return {
            type: input.type,
            name: product.name,
            id: product.id,
            price: product.price
        }

    }
}