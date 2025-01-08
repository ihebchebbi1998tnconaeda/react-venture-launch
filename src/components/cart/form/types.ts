import { z } from "zod";

export const userFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  country: z.string(),
  zipCode: z.string(),
});

export type UserFormData = z.infer<typeof userFormSchema>;