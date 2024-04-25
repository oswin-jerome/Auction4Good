import { z } from "zod";

export const registerUserSchema = z.object({
  first_name: z.string().min(1, "Required"),
  last_name: z.string().min(1, "Required"),
  email: z.string().email(),
  password: z.string().min(5),
  phone: z.string().length(10, "Enter a valid phone number"),
});
