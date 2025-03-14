import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutItem } from "../checkout-item";
import { getCartItemsDetails } from "@/shared/lib";
import { ProductSize, ProductType } from "@/shared/constants/product";
import { ICartItem } from "../../../shared/lib/get-cart-details";
import { Skeleton } from "@/components/ui";

interface Props {
  className?: string;
  items: ICartItem[];
  updateItemQuantity: (id: number, quantity: number) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  updateItemQuantity,
  items,
  removeCartItem,
  loading,
}) => {
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <WhiteBlock title="1. Cart">
      <div className="flex flex-col gap-5">
        {loading &&
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-[60px]" />
          ))}

        {!loading &&
          items.length > 0 &&
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              details={getCartItemsDetails(
                item.ingredients,
                item.productType as ProductType,
                item.productSize as ProductSize
              )}
              disabled={item.disabled}
              onClickCountButton={(type) =>
                onClickCountButton(item.id, item.quantity, type)
              }
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
      </div>
    </WhiteBlock>
  );
};
