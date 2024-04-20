
import Address from './entity/address';
import Customer from './entity/customer';
import Order from './entity/order';
import OrderItem from './entity/order_item';
let customer = new Customer('123', 'John Doe');
const address = new Address(
    "Rua dois",
    "Belford Roxo",
    "RJ",
    "26140-630",
    "83"
);

customer.Address = address;
customer.activate();

const item1 = new OrderItem('1', 'Shampoo', 10);
const item2 = new OrderItem('2', 'Conditioner', 15);

const order = new Order('1', customer.id, [item1, item2]);