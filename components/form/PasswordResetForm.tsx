"use client";
import { Form, FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/actions/auth.actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

export function PasswordResetForm() {

  const PasswordResetEmailSchema = z.object({
    email: z
      .string()
      .email({ message: "Invalid email format" })
      .min(5, { message: "Email must be at least 5 characters." }),
  });

  type PasswordResetEmailSchemaType = z.infer<typeof PasswordResetEmailSchema>;

  const form = useForm<PasswordResetEmailSchemaType>({
    resolver: zodResolver(PasswordResetEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(data: z.infer<typeof PasswordResetEmailSchema>) {
    const res = await resetPassword(data.email);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    }
    toast({
      variant: "default",
      description: res.message,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  {...register("email")}
                  required
                />
              </FormControl>
              {errors.email && (
                <FormMessage>{errors.email.message}</FormMessage>
              )}
              <FormMessage />
            </FormItem>
          </div>

          <Button type="submit" className="w-full">
            Send password reset email
          </Button>
        </div>
      </form>
    </Form>
  );
}
