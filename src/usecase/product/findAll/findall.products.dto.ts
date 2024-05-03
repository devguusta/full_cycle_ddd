export interface InputFindAllProducts { }



type _Products = {
    id: string;
    name: string;
    price: number;
}[];


export interface OutputFindAllProducts {
    products: _Products
}