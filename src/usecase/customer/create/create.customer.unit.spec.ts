const input = {
    "name": "John",
    "address": {
        "street": "Street",
        "city": "City",
        "zip": "Zip",
        "number": "Number"
    },

};


const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
};


describe("Unit test create customer use case", () => {
    it("Should create a customer",async () => {
        const customerRepository = MockRepository();
        const customerCreateUseCase = new CustomerCreateUseCase(customerRepository);

        const output = await customerRepository.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,

            }
        })
        
    } )
})