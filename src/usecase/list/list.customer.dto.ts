

export interface InputListCustomerDto{}


type _Customer = {
    id: string;
    name: string;
    address: {
        street: string;
        number: string;
        zip: string;
        city: string
    }
}

export interface OutputListCustomerDto{
    customers: _Customer[]
}