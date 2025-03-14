import { ProductItem } from "@prisma/client";
import { productSizes, ProductType } from "../constants/product";
import { Variant } from "@/components/shared/group-variants";

export const getAvailableSizes = (
  type: ProductType,
  items: ProductItem[]
): Variant[] => {
  const filteredProductsBySize = items.filter(
    (item) => item.productType === type
  );

  return productSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredProductsBySize.find(
      (product) => Number(product.size) === Number(item.value)
    ),
  }));
};
