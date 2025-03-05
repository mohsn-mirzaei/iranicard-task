"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { LoginFormSchema, loginFormSchema } from "@/schemas";
import mutateLogin from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { digitsFaToEn } from "@persian-tools/persian-tools";
import { KeyRound, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputFloatingLabel from "./input-floating-label";
import PasswordInput from "./password-input";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { mutate, isPending } = mutateLogin();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      mobile: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormSchema) => {
    mutate(values, {
      onSuccess: () => {
        router.refresh();
      },
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1 justify-center items-center">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
            <KeyRound className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">ورود</CardTitle>

          <CardDescription>
            جهت ورود به حساب شماره تلفن و رمز عبور خود را وارد کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputFloatingLabel
                        {...field}
                        id={field.name}
                        label="شماره تلفن"
                        type="tel"
                        dir="ltr"
                        className="text-right"
                        onChange={(e) => {
                          field.onChange(digitsFaToEn(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    در حال پردازش...
                  </>
                ) : (
                  "ورود"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
