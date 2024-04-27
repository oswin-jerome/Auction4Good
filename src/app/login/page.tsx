"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import hero from "@/assets/hero.jpg";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorMessage from "@/components/ErrorMessage";
export default function LoginPage() {
  const search = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
        password: z.string().min(5, "Password must be minimum 5 characters"),
      })
    ),
  });
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
          </div>
          <form
            onSubmit={handleSubmit(async (data) => {
              const res = await signIn("credentials", {
                username: data.email,
                password: data.password,
                redirect: true,
                callbackUrl: search.has("callbackUrl") ? search.get("callbackUrl") ?? "" : "/?login=success",
              });
              console.log(res);
            })}
          >
            <div className="grid gap-4">
              {search.has("error") && <p className="text-red-500 text-center text-sm">Credentials didn't match</p>}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                <ErrorMessage error={errors.email?.message} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" {...register("password")} />
                <ErrorMessage error={errors.password?.message} />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={"/register"} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden h-screen lg:block">
        <Image src={hero} alt="Image" width="1920" height="1080" className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
}
