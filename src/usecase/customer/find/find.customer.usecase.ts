import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./find.customer.dto";

export default class FindCustomerUseCase {
    private customerRepository: CustomerRepository;

    constructor(customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }


    public async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customer = await this.customerRepository.find(input.id);
        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                number: customer.Address.number,
                zip: customer.Address.zip,
            },
        };
    }




}