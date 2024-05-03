import FindAllProductsUseCase from "./findall.products.usecase";




const product1 = {

    name: "Malbec",
    price: 100.00,
    id: "SKU283198"
}
const product2 = {

    name: "Rexona",
    price: 20.00,
    id: "SKU23123183"
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockResolvedValue([product1, product2]),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
};

const input = {
    id: "SKU283198"
};




describe('Unit test find all product usecase', () => {

    it("Should find all product", async () => {
        const repository = MockRepository();

        const usecase = new FindAllProductsUseCase(repository);

        const output = await usecase.execute(input)

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    });



});