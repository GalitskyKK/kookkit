import { z } from "zod";

const messages = {
  firstName: "First name must be at least 2 characters long",
  lastName: "Last name must be at least 2 characters long",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  address: "Please enter a valid address",
};

export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: messages.firstName }),
  lastName: z.string().min(2, { message: messages.lastName }),
  email: z.string().email({ message: messages.email }),
  phone: z.string().min(10, { message: messages.phone }),
  address: z.string().min(5, { message: messages.address }),
  comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
