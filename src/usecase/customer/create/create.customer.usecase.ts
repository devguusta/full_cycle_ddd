import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto, OutputFindCustomerDto } from "./create.customer.dto";
import { v4 as uuid } from 'uuid';
import CustomerFactory from '../../../domain/customer/factory/customer.factory';


export default class CreateCustomerUseCase {

    private customerRepository: CustomerRepositoryInterface;


    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }

    async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {

        const customerId = uuid();

        const customer = CustomerFactory.createWithAddress(input.address);

    }
}