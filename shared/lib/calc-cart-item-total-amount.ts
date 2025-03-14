import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalAmount = (item: CartItemDTO) => {
   return (item.productItem.price + item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) * item.quantity;
}