import { cn } from "@/shared/lib/utils";
import React from "react";
import { ProductImage } from "./product-image";
import { Title } from "./title";
import { Button } from "../ui/button";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  onSubmit?: VoidFunction;
  loading?: boolean;
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  imageUrl,
  name,
  price,
  onSubmit,
  loading,
  className,
}) => {
  return (
    <div className={cn(className, "flex gap-4 md:gap-0 flex-col md:flex-row")}>
      <div className="flex items-center justify-center md:flex-1 relative md:w-full">
        <img
          src={imageUrl}
          alt={name}
          className="md:relative left-2 top-2 transition-all z-10 duration-300 md:h-[500px] rounded-xl"
        />
      </div>
      <div className="w-full md:w-[490px] bg-[#fcfcfc] md:p-7 h-full flex flex-col justify-between">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={loading}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={() => onSubmit?.()}>
          Add to cart for {price} rub.
        </Button>
      </div>
    </div>
  );
};
