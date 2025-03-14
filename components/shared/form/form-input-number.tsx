"use client";

import { Input } from "@/components/ui";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { useFormContext, Controller } from "react-hook-form";
import { IMaskInput } from "react-imask";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
  mask?: string; // добавляем свойство mask
}

export const FormInputNumber: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  mask, // добавляем свойство mask
  ...props
}) => {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        {mask ? (
          <Controller
            {...register(name)}
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask={mask}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 ring-offset-background h-12 text-md"
                {...props}
                unmask={true}
                onChange={(event: any) => field.onChange(event.target.value)}
              />
            )}
          />
        ) : (
          <Input className="h-12 text-md" {...register(name)} {...props} />
        )}

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
