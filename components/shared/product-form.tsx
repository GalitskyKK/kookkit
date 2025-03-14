"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { ChooseMainForm } from "./choose-main-form";
import { ChooseProductForm } from "./choose-product-form";
import { Ingredient } from "@prisma/client";

// export interface IngredientsAll {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
  ingredientsAll: Ingredient[];
}

export const ProductForm: React.FC<Props> = ({
  product,
  onSubmit: _onSubmit,
  ingredientsAll,
}) => {
  const [addCartItem, loading] = useCartStore((state) => [
    state.addCartItem,
    state.loading,
  ]);

  const firstItem = product.items[0];
  const isProductForm = Boolean(firstItem.productType);

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(product.name + " added to cart");

      _onSubmit?.();
    } catch (err) {
      toast.error("Failed to add product to cart");
      console.error(err);
    }
  };

  if (isProductForm) {
    return (
      <ChooseMainForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={ingredientsAll}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
