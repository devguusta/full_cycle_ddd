import Address from "./address";
export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = false;

    constructor(id: string, name: string,){
        this._name = name;
        this._id = id;

        this.validate();
        
       
    }

    validate (){
        if (this._name.length === 0) {
            throw new Error('Name is required');
        }
     
        if (this._id.length === 0) {
            throw new Error('Id is required');
        }
    }

    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get isActive() {
        return this._active;
    }

  
changeName(name: string) {
    this._name = name;
    this.validate();
}

 activate() {
    if(this._address === undefined){
        throw new Error('Address is mandatory to activate a customer');
    }
    this._active = true;
 }
 deactivate() { 
    this._active = false;
 }

 set Address(address: Address) {
     this._address = address;
     this.validate();
 }

}