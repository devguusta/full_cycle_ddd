import UpdateProductUseCase from "./update.product.usecase";



const product = {
    type: "b" as const,
    name: "Malbec",
    price: 100.00,
    id: "SKU283198"
}

const MockRepository = () => {
    return {
        find: jest.fn().mockResolvedValue(product),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
};

const input = {
    type: "a" as const,
    name: "Malbec",
    price: 120.00,
    id: "SKU283198"
};




describe('Unit test create product usecase', () => {

    it("Should update a product", async () => {
        const repository = MockRepository();

        const usecase = new UpdateProductUseCase(repository);

        const output = await usecase.execute(input)
        input.id = output.id;

        expect(output).toEqual(input);
    });



});