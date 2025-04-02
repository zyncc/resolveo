"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

export default function Header() {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex header justify-between py-5 fixed top-0 left-0 right-0 z-10 bg-white/30 backdrop-blur-lg">
      <div className="flex justify-between items-center w-full container mx-auto">
        <Link href={"/"}>
          <h1 className="font-semibold text-xl text-black">RESOLVEO</h1>
        </Link>
        <nav>
          <ul className="flex gap-x-8 items-center text-black font-medium text-base">
            <Link href={"/"}>
              <li>Home</li>
            </Link>
            <Link href={"/about"}>
              <li>About</li>
            </Link>
            <Link href={"/register"}>
              <li>Register</li>
            </Link>
            <Link href={"/dashboard"}>
              <li>Dashboard</li>
            </Link>
            {!session?.session ? (
              <Link href="/signin">
                <Button className="rounded-xl" variant="secondary">
                  Sign in
                </Button>
              </Link>
            ) : (
              <Button
                onClick={() => authClient.signOut()}
                className="rounded-xl"
                variant="secondary"
              >
                Sign Out
              </Button>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
