import { mapType, ProductSize, ProductType } from "../constants/product";
import { ProductItem, Ingredient } from "@prisma/client";
import { calcTotalPrice } from "./calc-total-price";

export const getDetails = (
  type: ProductType,
  size: ProductSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPrice(
    items,
    ingredients,
    selectedIngredients,
    size,
    type
  );

  const textDetails = `${size} g, ${mapType[type]}`;

  return {
    totalPrice,
    textDetails,
  };
};
