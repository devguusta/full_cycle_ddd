import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUseCase {

    private productRepository: ProductRepositoryInterface;


    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    };


    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {

        const product = await this.productRepository.find(input.id);

        return {

            name: product.name,
            id: product.id,
            price: product.price
        }

    }
}