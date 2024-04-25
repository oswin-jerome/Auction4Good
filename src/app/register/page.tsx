"use client";
import { registerUser } from "@/actions/user";
import ErrorMessage from "@/components/ErrorMessage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUserSchema } from "@/zod/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { set, z } from "zod";

type RegisterData = z.infer<typeof registerUserSchema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerUserSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await registerUser(data);
        if (!res?.success) {
          Object.keys(res?.errors ?? {}).forEach((err) => {
            if (err == "phone") {
              setError("phone", {
                type: "custom",
                message: res?.errors?.phone,
              });
            }
            if (err == "email") {
              setError("email", {
                type: "custom",
                message: res?.errors?.email,
              });
            }
          });
        }

        if (res?.success) {
          reset();
        }
      })}
    >
      <Card className="mx-auto max-w-sm mt-20">
        <CardHeader>
          {isSubmitSuccessful && <p className="text-green-600 bg-green-600/10 p-2 rounded">Registered</p>}
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" {...register("first_name")} />
                <ErrorMessage error={errors.first_name?.message} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" {...register("last_name")} />
                <ErrorMessage error={errors.last_name?.message} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
              <ErrorMessage error={errors.email?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="text" placeholder="967829371" {...register("phone")} />
              <ErrorMessage error={errors.phone?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} />
              <ErrorMessage error={errors.password?.message} />
            </div>
            <Button disabled={isSubmitting} type="submit" className="w-full">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="#" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
