"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { GroupVariants } from "./group-variants";
import { ProductSize, ProductType, productTypes } from "@/shared/constants/product";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useProductOptions } from "@/shared/hooks";
import { getDetails } from "@/shared/lib";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
  className?: string;
}

export const ChooseMainForm: React.FC<Props> = ({
  imageUrl,
  name,
  ingredients,
  items,
  onSubmit,
  loading,
  className,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    availableProductSizes,
    setSize,
    setType,
    addIngredients,
    currentItemId,
  } = useProductOptions(items);

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  const { totalPrice, textDetails } = getDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  return (
    <div className={cn(className, "flex flex-col md:flex-row")}>
      <ProductImage imageUrl={imageUrl} size={size} />
      <div className="w-full md:w-[490px] bg-[#fcfcfc] md:p-7 rounded-md">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableProductSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as ProductSize)}
          />
          <GroupVariants
            items={productTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as ProductType)}
          />
        </div>
        <div className="bg-gray-50 p-1 md:p-5 rounded-md md:h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-1 md:gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredients(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart for {totalPrice} rub.
        </Button>
      </div>
    </div>
  );
};
