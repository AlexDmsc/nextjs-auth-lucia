import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema } from "@/types/index";
import { signUp } from "@/actions/auth.actions";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SignUpForm() {
  const router = useRouter();

  type SignUpSchemaType = z.infer<typeof SignUpSchema>;

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<SignUpSchemaType> = async (data) => {
    const res = await signUp(data);
    if (res.error) {
      toast({
        variant: "destructive",
        description: res.error,
      });
    } else if (res.success) {
      toast({
        variant: "default",
        description: "Account created successfully!",
      });
    }

    router.push("/auth/signin");
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    {...register("firstName")}
                    required
                  />
                </FormControl>
                {errors.firstName && (
                  <FormMessage>{errors.firstName.message}</FormMessage>
                )}
              </FormItem>
            </div>

            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...register("lastName")} required />
              </FormControl>
              {errors.lastName && (
                <FormMessage>{errors.lastName.message}</FormMessage>
              )}
            </FormItem>
          </div>

          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="j@example.com"
                {...register("email")}
                required
              />
            </FormControl>
            {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
          </FormItem>

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
            Create an account
          </Button>

          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
