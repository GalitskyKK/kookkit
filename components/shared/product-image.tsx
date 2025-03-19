import { cn } from "@/shared/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
  size: 200 | 300 | 400;
}

export const ProductImage: React.FC<Props> = ({
  imageUrl,
  size,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center flex-1 relative md:w-full",
        className
      )}>
      <img
        src={imageUrl}
        alt="Logo"
        className={cn(
          "relative left-2 top-2 transition-all z-10 duration-300 rounded-full",
          {
            "md:w-[300px] md:h-[300px]": size === 200,
            "md:w-[400px] md:h-[400px]": size === 300,
            "md:w-[500px] md:h-[500px]": size === 400,
          }
        )}
      />

      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 border-gray-200 rounded-full w-[450px] h-[450px]" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 border-gray-200 rounded-full w-[370px] h-[370px]" />
    </div>
  );
};
