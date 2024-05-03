import FindProductUseCase from "./find.product.usecase";



const product = {

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
    id: "SKU283198"
};




describe('Unit test find product usecase', () => {

    it("Should find a product", async () => {
        const repository = MockRepository();

        const usecase = new FindProductUseCase(repository);

        const output = await usecase.execute(input)

        expect(output).toEqual(product);
    });



});