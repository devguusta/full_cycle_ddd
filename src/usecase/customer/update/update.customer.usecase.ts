import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from "./update.customer.dto";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface){
        this.customerRepository = customerRepository;
    }


    async execute(input: InputUpdateCustomerDto) : Promise<OutputUpdateCustomerDto> {


        const customer = await this.customerRepository.find(input.id);

        customer.changeAddress(new Address(input.address.street,input.address.city,input.address.zip,input.address.number))
        customer.changeName(input.name);

        await this.customerRepository.update(customer);

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.Address.street,
                city: customer.Address.city,
                zip: customer.Address.zip,
                number: customer.Address.number, 
            }
        }
    }
}