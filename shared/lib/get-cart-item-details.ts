import { mapType, ProductSize, ProductType } from "../constants/product";
import { ICartItem } from "./get-cart-details";

export const getCartItemsDetails = (
  ingredients: ICartItem["ingredients"],
  productType?: ProductType,
  productSize?: ProductSize
) => {
  const details = [];

  if (productSize && productType) {
    const typeName = mapType[productType];
    details.push(`${typeName}, ${productSize} g`);
  }

  if (ingredients.length) {
    const ingredientsNames = ingredients.map(({ name }) => name);
    details.push(ingredientsNames.join(", "));
  }

  return details.join(", ");
};
