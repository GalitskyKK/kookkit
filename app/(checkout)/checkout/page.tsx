"use client";

import { CheckoutSidebar, Container, Title } from "@/components/shared";
import { useCart } from "@/shared/hooks/use-cart";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutCart,
  CheckoutDelivery,
  CheckoutPersonal,
} from "@/components/shared/checkout";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/constants/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false);
  const { totalAmount, items, updateItemQuantity, removeCartItem, loading } =
    useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName, lastName] = data?.fullName?.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }
    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.success("Order created successfully", {
        icon: "🚀",
      });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      toast.error("Failed to create order", {
        icon: "❌",
      });
    }
  };

  return (
    <Container className="mt-10 w-full p-0">
      <Title text="Checkout" size="xl" className="font-extrabold mb-8" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-1 md:gap-10 flex-col md:flex-row">
            <div className="flex flex-col gap-10 flex-1 md:mb-20 mb-5">
              <CheckoutCart
                loading={loading}
                items={items}
                updateItemQuantity={updateItemQuantity}
                removeCartItem={removeCartItem}
              />
              <CheckoutPersonal loading={loading} />
              <CheckoutDelivery loading={loading} />
            </div>

            <div className="md:w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
