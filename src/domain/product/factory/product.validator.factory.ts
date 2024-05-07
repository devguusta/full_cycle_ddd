
import ProductYupValidator from "../../@shared/validator/product.yup.validator";
import ValidatorInterface from "../../@shared/validator/validator.interface";

import ProductInterface from "../entity/product.interface";


export default class ProductValidatorFactory {
    static create(): ValidatorInterface<ProductInterface> {
        return new ProductYupValidator();
    }
}