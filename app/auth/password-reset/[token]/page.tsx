"use client";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordResetSchema } from "@/types/index";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { updatePassword } from "@/actions/auth.actions";
import { useRouter, useParams } from "next/navigation";

export default function ResetPasswordToken() {
  const params = useParams<{ token: string }>();
  const router = useRouter();

  type PasswordResetSchemaType = z.infer<typeof PasswordResetSchema>;

  const form = useForm<PasswordResetSchemaType>({
    resolver: zodResolver(PasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<PasswordResetSchemaType> = async (data) => {
    console.log(params.token);

    const response = await fetch(`/api/password-reset/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: data.password }),
    });

    if (response.status === 200) {
      await updatePassword(response.user, data.password);
      router.push("/");
    } else {
      const error = await response.json();
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>Update your password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="****"
                      {...register("password")}
                      required
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormItem>

                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="****"
                      {...register("confirmPassword")}
                      required
                    />
                  </FormControl>
                  {errors.confirmPassword && (
                    <FormMessage>{errors.confirmPassword.message}</FormMessage>
                  )}
                </FormItem>

                <Button type="submit" className="w-full">
                  Change password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
