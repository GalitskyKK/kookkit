"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemsDetails } from "@/shared/lib";
import { ProductSize, ProductType } from "@/shared/constants/product";
import { useCart } from "@/shared/hooks/use-cart";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F5F9FC]">
        <SheetHeader className="p-4">
          <SheetTitle>
            In cart <span className="font-bold">{items.length} products</span>
          </SheetTitle>
        </SheetHeader>
        <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
          {items.map((item) => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                id={item.id}
                imageUrl={item.imageUrl}
                details={getCartItemsDetails(
                  item.ingredients,
                  item.productType as ProductType,
                  item.productSize as ProductSize
                )}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={(type) =>
                  onClickCountButton(item.id, item.quantity, type)
                }
                onClickRemove={() => removeCartItem(item.id)}
              />
            </div>
          ))}
        </div>
        <SheetFooter className="-mx-6 bg-white p-8 rounded-lg">
          <div className="flex items-center justify-center">
            <span className="flex flex-1 text-lg text-neutral-500">
              Total
              <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
            </span>
            <span className="font-bold text-lg">{totalAmount} Rub</span>
          </div>
          <Link href="/checkout">
            <Button
              onClick={() => setRedirecting(true)}
              loading={redirecting}
              type="submit"
              className="w-full h-12 text-base">
              Go to cart
              <ArrowRight className="w-5 ml-2" />
            </Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
