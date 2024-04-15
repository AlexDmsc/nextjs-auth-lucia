"use client";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema } from "@/types/index";
import { signIn } from "@/actions/auth.actions";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export function SignInForm() {
  const router = useRouter();

  type SignInSchemaType = z.infer<typeof SignInSchema>;

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleSignIn: SubmitHandler<SignInSchemaType> = async (data) => {
    const res = await signIn(data);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Signed in successfully",
      });

      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSignIn)} className="space-y-8">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="j@example.com"
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

          <div className="grid gap-2">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...register("password")} required />
              </FormControl>
              {errors.password && (
                <FormMessage>{errors.password.message}</FormMessage>
              )}
            </FormItem>
            <div className="flex items-center">
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
