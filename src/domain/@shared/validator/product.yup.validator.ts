
import ValidatorInterface from './validator.interface';
import * as yup from "yup";
import Product from '../../product/entity/product';
export default class ProductYupValidator implements ValidatorInterface<Product> {
    validate(entity: Product): void {
        try {
            yup.object().shape({
                id: yup.string().required("Id is required"),

                name: yup.string().required("Name is required"),
                price: yup.number().positive("Price most be greater than zero"),
            }).validateSync({
                id: entity.id, name: entity.name, price: entity.price
            }, {
                abortEarly: false
            })
        } catch (errors) {
            const err = errors as yup.ValidationError;
            err.errors.forEach((error) => {
                entity.notification.addError({
                    context: "product",
                    message: error,
                })
            })

        }
    }
}