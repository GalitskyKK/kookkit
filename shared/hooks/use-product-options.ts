import { useEffect, useState } from "react";
import { ProductSize, ProductType } from "../constants/product";
import useSet from "react-use/lib/useSet";
import { getAvailableSizes } from "../lib/get-available-sizes";
import { ProductItem } from "@prisma/client";
import { Variant } from "@/components/shared/group-variants";

interface ReturnProps {
  size: ProductSize;
  setSize: (size: ProductSize) => void;
  type: ProductType;
  setType: (type: ProductType) => void;
  selectedIngredients: Set<number>;
  addIngredients: (key: number) => void;
  availableProductSizes: Variant[];
  currentItemId?: number;
}

export const useProductOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = useState<ProductSize>(300);
  const [type, setType] = useState<ProductType>(1);
  const [selectedIngredients, { toggle: addIngredients }] = useSet(
    new Set<number>([])
  );
  const availableProductSizes = getAvailableSizes(type, items);

  const currentItemId = items.find(
    (item) => item.productType === type && item.size === size
  )?.id;

  useEffect(() => {
    const isAvailableSize = availableProductSizes?.find(
      (item) => Number(item.value) === size && !item.disabled
    );
    const availableSize = availableProductSizes?.find((size) => !size.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize?.value) as ProductSize);
    }
  }, [type]);

  return {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    addIngredients,
    availableProductSizes,
    currentItemId,
  };
};
