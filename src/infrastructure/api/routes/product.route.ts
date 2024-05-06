import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../customer/repository/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/product.repository';
import FindAllProductsUseCase from '../../../usecase/product/findAll/findall.products.usecase';
export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());

    try {
        const productDto = {
            type: req.body.type,
            name: req.body.name,
            price: req.body.price
        };

        const output = await usecase.execute(productDto);
        res.send(output);

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

productRoute.get('/', async (req: Request, res: Response) => {
    const usecase = new FindAllProductsUseCase(new ProductRepository());

    try {


        const output = await usecase.execute({});
        res.send(output);

    } catch (error) {
        res.status(500).send(error);
    }
});