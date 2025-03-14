import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import * as React from "react";

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccess: React.FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Thanks for your order!</h1>

    <p>Your order #{orderId} has been paid. List of items:</p>
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} - {item.productItem.price} Rub x{" "}
          {item.quantity} = {item.quantity * item.productItem.price}
        </li>
      ))}
    </ul>
  </div>
);
