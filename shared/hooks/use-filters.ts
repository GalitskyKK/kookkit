import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  productTypes: string[];
  sizes: string[];
  ingredients: string[];
}

export interface Filters {
  sizes: Set<string>;
  productTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, value: number) => void;
  setProductType: (value: string) => void;
  setSize: (value: string) => void;
  setIngredient: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams();

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(","))
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []
    )
  );

  const [productTypes, { toggle: toggleTypes }] = useSet(
    new Set<string>(
      searchParams.has("productTypes")
        ? searchParams.get("productTypes")?.split(",")
        : []
    )
  );

  const [prices, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({ ...prev, [name]: value }));
  };

  return useMemo(
    () => ({
      sizes,
      productTypes,
      selectedIngredients,
      prices,
      setSize: toggleSizes,
      setProductType: toggleTypes,
      setPrice: updatePrice,
      setIngredient: toggleIngredients,
    }),
    [sizes, productTypes, selectedIngredients, prices]
  );

  // return {
  // sizes,
  // productTypes,
  // selectedIngredients,
  // prices,
  // setSize: toggleSizes,
  // setProductType: toggleTypes,
  // setPrice: updatePrice,
  // setIngredient: toggleIngredients,
  // };
};
