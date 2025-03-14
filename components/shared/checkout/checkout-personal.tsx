import React from "react";
import { WhiteBlock } from "../white-block";
import { Skeleton } from "@/components/ui";
import { FormInput } from "../form";

interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutPersonal: React.FC<Props> = ({ loading, className }) => {

  //todo add reactIMask
  return (
    <WhiteBlock title="2. Personal information">
      <div className="grid grid-cols-2 gap-5">
        {loading ? (
          [...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-[48px]" />
          ))
        ) : (
          <>
            <FormInput
              name="firstName"
              className="text-base"
              placeholder="Name"
            />
            <FormInput
              name="lastName"
              className="text-base"
              placeholder="Lastname"
            />
            <FormInput
              name="email"
              className="text-base"
              placeholder="E-Mail"
            />
            <FormInput
              name="phone"
              className="text-base"
              placeholder="Phone number"
            />
          </>
        )}
        {/* <FormInputNumber
          name="phone"
          className="text-base"
          placeholder="Phone number"
          mask="+{7} (000) 000-00-00"
        /> */}
      </div>
    </WhiteBlock>
  );
};
