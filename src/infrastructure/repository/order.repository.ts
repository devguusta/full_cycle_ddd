import Order from "../../domain/checkout/entity/order";
import OrderItem from "../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


export default class OrderRepository implements OrderRepositoryInterface {
  async findAll(): Promise<Order[]> {

    try {
      const orderModels = await OrderModel.findAll({
        include: [OrderItemModel],
      });
  
      return orderModels.map((orderModel) => {

        const orderItems: OrderItem[] = orderModel.items.map((item) => {
          return new OrderItem(
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.product_id
          );
        });
        
        const order = new Order(orderModel.id, orderModel.customer_id, orderItems);
      
        return order;
      });
      
    } catch (error) {
      throw error;
    }
  
  }
 async  find(id: string): Promise<Order> {
    try {
      const orderModel = await OrderModel.findOne({
        where: { id },
        include: [OrderItemModel],
      });
  
      if (!orderModel) {
        throw new Error("Order not found");
      }
  
      const orderItems: OrderItem[] = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.product_id
        );
      });
  
      const order = new Order(orderModel.id, orderModel.customer_id, orderItems);
  
      return order;
    } catch (error) {
      throw error;
    }
  }
 async update(data: Order): Promise<void> {
  try {
    await OrderModel.update(
      {
        total: data.total(),
      },
      {
        where: { id: data.id },
      }
    );

    await OrderItemModel.destroy({
      where: {
        order_id: data.id,
      },
    });

    await OrderItemModel.bulkCreate(
      data.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        product_id: item.productId,
        order_id: data.id,
      }))
    );
    
  } catch (error) {

    throw error;
    
  }
  }
 async delete(id: string): Promise<boolean> {
    try {
      await OrderModel.destroy({
        where: { id },
      });
  
      return true;
    } catch (error) {
      throw error;
    }
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}