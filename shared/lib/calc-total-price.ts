import { ProductSize, ProductType } from "../constants/product";
import { ProductItem, Ingredient } from "@prisma/client";

/**
 * Function to calculate total price
 *
 * @example calcTotalPrice(items, ingredients, selectedIngredients, size, type);
 *
 * @param items - all products
 * @param ingredients - all ingredients
 * @param selectedIngredients - selected ingredients
 * @param size - size of product
 * @param type - type of product
 * @returns total price
 */
export const calcTotalPrice = (
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
  size: ProductSize,
  type: ProductType
) => {
  const productPrice = (size: ProductSize, type: ProductType) => {
    const product =
      items.find((item) => item.size === size && item.productType === type)
        ?.price || 0;
    return product;
  };
  const IngPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = productPrice(size, type)
    ? productPrice(size, type) + IngPrice
    : 0;

  return totalPrice;
};
