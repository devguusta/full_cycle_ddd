export interface InputUpdateProductDto {
    id: string;
    type: "a" | "b";
    name: string;
    price: number;
}


export interface OutputUpdateProductDto {
    type: "a" | "b";
    id: string;
    name: string;
    price: number;
}