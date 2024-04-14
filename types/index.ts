import { z } from "zod";

export const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "FirstName must be at least 2 characters." }),
    lastName: z
      .string()
      .min(2, { message: "LastName must be at least 2 characters." }),
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(5, { message: "Email must be at least 5 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"],
  });

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters." }),
  password: z.string(),
});
