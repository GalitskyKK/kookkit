import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { Package, Percent, Truck, ArrowRight } from "lucide-react";
import { Button, Skeleton } from "../ui";

const TAX_PERCENT = 10;
const DELIVERY_PRICE = 250;

interface Props {
  totalAmount: number;
  loading?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
  const TAX = (totalAmount * TAX_PERCENT) / 100;
  const totalCheckoutPrice = totalAmount + TAX + DELIVERY_PRICE;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Total:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-2xl font-extrabold">
            {totalCheckoutPrice} Rub
          </span>
        )}
      </div>
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Price:
          </div>
        }
        value={
          loading ? <Skeleton className="w-24 h-6" /> : `${totalAmount} Rub`
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Tax:
          </div>
        }
        value={loading ? <Skeleton className="w-24 h-6" /> : `${TAX} Rub`}
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Delivery:
          </div>
        }
        value={
          loading ? <Skeleton className="w-24 h-6" /> : `${DELIVERY_PRICE} Rub`
        }
      />
      <Button
        loading={loading}
        type="submit"
        disabled={false}
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Checkout
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
