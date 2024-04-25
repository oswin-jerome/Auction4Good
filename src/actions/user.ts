import { registerUserSchema } from "@/zod/schemas";

export const registerUser = (user: Object) => {
  try {
    registerUserSchema.parse(user);
  } catch (e) {
    return e;
  }
};
