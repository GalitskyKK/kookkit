"use client"

import React from "react";
import { WhiteBlock } from "../white-block";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorText } from "../error-text";
import { Skeleton } from "@/components/ui";
import { FormTextarea } from "../form";
import { AddressInput } from "../address-input";


interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutDelivery: React.FC<Props> = ({ loading, className }) => {

  const {control} = useFormContext();

  return (
    <WhiteBlock title="3. Delivery address">
      <div className="flex flex-col gap-5">
        {loading ? (
          [...Array(2)].map((_, index) => (
            <Skeleton key={index} className="h-[48px]" />
          ))
        ) : (
          <>
            <Controller
          control={control}
          name="address"
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange} />
              {fieldState.error?.message && (
                <ErrorText text={fieldState.error.message} />
              )}
            </>
          )}
        />
        {/* <FormInput
          name="firstName"
          className="text-base"
          placeholder="Address"
        /> */}
        <FormTextarea
          name="comment"
          className="text-base"
          rows={5}
          placeholder="Comment"
        />
          </>
        )}
      </div>
    </WhiteBlock>
  );
};
