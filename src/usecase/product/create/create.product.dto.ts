export interface InputCreateProductDto {
    type: "a" | "b";
    name: string;
    price: number;
}


export interface OutputCreateProductDto {
    type: string;
    id: string;
    name: string;
    price: number;
}