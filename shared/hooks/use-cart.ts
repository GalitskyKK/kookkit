import { useEffect } from "react";
import { ICartItem } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { useCartStore } from "../store";

type ReturnProps = {
  totalAmount: number;
  items: ICartItem[];
  loading: boolean;
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  addCartItem: (values: CreateCartItemValues) => void;
};

export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};
