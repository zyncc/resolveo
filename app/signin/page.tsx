"use client";
import Image from "next/image";
import bg from "@/public/signin.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function SignIn() {
  const { data: session } = authClient.useSession();
  if (session?.session) {
    redirect("/dashboard");
  }
  async function handleSignin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    await authClient.signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          console.log("Success");
        },
      },
    });
  }
  return (
    <div>
      <Image src={bg} fill alt="" />
      <div className="flex items-center justify-center w-full h-screen">
        <div className="rounded-lg backdrop-blur-lg bg-white/30 p-6">
          <h1 className="font-semibold text-3xl mb-5 text-white text-center">
            Resolveo
          </h1>
          <form onSubmit={(e) => handleSignin(e)}>
            <div className="flex flex-col gap-5">
              <Label htmlFor="email" className="text-white font-medium">
                Email
              </Label>
              <Input
                type="email"
                className="placeholder:text-white placeholder:font-medium"
                placeholder="Enter your email"
                name="email"
              />
              <Label htmlFor="password" className="text-white font-medium">
                Password
              </Label>
              <Input
                type="password"
                className="placeholder:text-white placeholder:font-medium"
                placeholder="Enter your password"
                name="password"
              />
              <Button type="submit" variant="secondary" className="rounded-xl">
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
