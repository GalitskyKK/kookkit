import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "@/components/shared/title";
import { FormInput } from "@/components/shared/form";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginSchema>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginSchema) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Logged in successfully", { icon: "🚀" });

      onClose?.();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Sign in" size="md" className="font-bold" />
            <p className="text-sm text-gray-400">
              Enter your email and password
            </p>
          </div>
          <img
            src="/assets/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>
        <FormInput name="email" placeholder="Email" type="email" />
        <FormInput name="password" placeholder="Password" type="password" />
        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit">
          Sign in
        </Button>
      </form>
    </FormProvider>
  );
};
