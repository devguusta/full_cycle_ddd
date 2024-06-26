export default class OrderItem {
   private _id: string;
   private  _name: string;
   private  _price: number;

   private _quantity: number;
   private _productId: string;


    constructor(id: string, name: string, price: number, quantity: number, productId: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
        this._productId = productId;
    }

    get id() : string{
        return this._id;
    }
    get name() : string{
        return this._name;
    }
    get productId() : string{
        return this._productId;
    }

    get price() : number{
        return this._price;
    }
    get quantity()  : number{
        return this._quantity;
    }

    orderItemTotal(): number {
        return this._price * this._quantity;
      }


      changeQuantity(quantity: number): void {
        this._quantity = quantity;
      }


      validate() : void {
        if (this._id.length === 0){
            throw new Error('Id is required')
        }

        if (this._name.length === 0){
            throw new Error('order name is required');
        }

        if(this._productId.length === 0){
            throw new Error('Product Id is required');
        }

        if(this._quantity <= 0){
            throw new Error("Quantity must be greater than 0")
        }

        if(this.price < 0 ){
            throw new Error("Price must be greater than zero")
        }
      }
}