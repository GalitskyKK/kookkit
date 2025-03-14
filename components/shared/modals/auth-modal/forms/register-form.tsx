import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterSchema } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/shared/form";
import { Button } from "@/components/ui";
import toast from "react-hot-toast";
import { registerUserInfo } from "@/app/actions";

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormRegisterSchema>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterSchema) => {
    try {
      await registerUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success("Sign up successfully | Confirm your E-mail", {
        icon: "🚀",
      });

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
        <FormInput name="email" label="Email" required />
        <FormInput name="fullName" label="Full name" required />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          required
        />
        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit">
          Sign up
        </Button>
      </form>
    </FormProvider>
  );
};
