import CreateProductUseCase from "./create.product.usecase";




const MockRepository = () => {
    return {
        find: jest.fn(),
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
};


describe('Unit test create product usecase', () => {

    it("Should create a product", async () => {
        const repository = MockRepository();

        const usecase = new CreateProductUseCase(repository);

        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: output.id,
            ...input,
        });
    });

    it("should throw an error when product name is empty", async () => {
        const repository = MockRepository();

        const usecase = new CreateProductUseCase(repository);
        const _input = {
            type: "a" as const,
            name: "",
            price: 120.00,
        };



        expect(() => {
            return usecase.execute(_input)
        }).rejects.toThrow("product: Name is required")
    });

    it("should throw an error when product price is less than 0", async () => {
        const repository = MockRepository();

        const usecase = new CreateProductUseCase(repository);
        input.price = -10;

        expect(() => {
            return usecase.execute(input)
        }).rejects.toThrow("product: Price most be greater than zero")
    });

})