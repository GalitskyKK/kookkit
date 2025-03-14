"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "../product-form";
import { Ingredient } from "@prisma/client";

interface Props {
  product: ProductWithRelations;
  className?: string;
  ingredientsAll: Ingredient[];
}

export const ChooseProductModal: React.FC<Props> = ({ product, ingredientsAll, className }) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (product) {
  //     router.push(`/product/${product.id}`);
  //   }
  // }, [product, router]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={handleOpenChange}>
      <DialogContent
        aria-describedby="content"
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[600px] bg-white overflow-hidden",
          className
        )}>
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <ProductForm
          product={product}
          ingredientsAll={ingredientsAll}
          onSubmit={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  );
};
