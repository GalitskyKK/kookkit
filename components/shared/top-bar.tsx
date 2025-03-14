import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import { SortPopup } from "./sort-popup";
import { Categories } from "./categories";
import { Category } from "@prisma/client";
import { CartButton } from "./cart-button";

interface Props {
  className?: string;
  hasCart?: boolean;
  categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, hasCart = true, className }) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}>
      <Container className="flex items-center justify-between">
        <Categories items={categories} />
        {/* <SortPopup /> */}
        {hasCart && <CartButton />}
      </Container>
    </div>
  );
};
