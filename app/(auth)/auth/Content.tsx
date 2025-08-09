"use client";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCheckAuth, useLogin } from "@/services/auth";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import clsx from "clsx";
import Logo from "@/assets/logo-white.svg";

export const Content = () => {
  const [isPending, setIsPending] = useState(false);
  const [canLoad, setCanLoad] = useState(false);
  const router = useRouter();

  const {
    mutate,
    error,
  }: { mutate: (data: FormData | {}) => void; error: any } = useLogin(
    (token) => {
      Cookies.set("token", token);
      router.push("/dashboard");
      setIsPending(false);
    }
  );
  const { mutateAsync: checkAuth, error: authError } = useCheckAuth(() => {
    router.push("/dashboard");
  });

  useEffect(() => {
    checkAuth({})
      .then(() => {
        setCanLoad(true);
      })
      .catch(() => {
        return;
      });
  }, []);

  useEffect(() => {
    if (error) {
      setIsPending(false);
    }
  }, [error]);

  useEffect(() => {
    if (authError) {
      setCanLoad(true);
    }
  }, [authError]);

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const form = new FormData(e.target as HTMLFormElement);
    const data = {
      email: form.get("email"),
      password: form.get("password"),
    };
    mutate(data);
  };
  return (
    <section className="h-screen flex items-end w-full bg-black text-white">
      {canLoad && (
        <>
          <Image
            src={"/auth/bg.jpg"}
            width={100000}
            height={100000}
            className="w-full h-[60%] absolute top-0 left-0 object-cover z-0"
            alt="background"
          />
          <div className="w-full bg-black z-10 relative pb-16 pt-12">
            <Container className="relative z-[1] flex justify-between items-center">
              <div className="w-full max-w-sm">
                <div className="mb-4">
                  <h1 className="text-primary font-normal text-4xl mb-2">
                    Welcome Back
                  </h1>
                  <p className="text-base leading-[140%] text-[#A0AEC0]">
                    Enter your email and password to sign in
                  </p>
                </div>
                <form className="[&_input]:text-black" onSubmit={login}>
                  <div className="grid gap-2 mb-3">
                    <Label htmlFor="email-input">Email</Label>
                    <Input
                      type="email"
                      placeholder="Your email address"
                      id="email-input"
                      className={clsx("py-5", {
                        "border-red-400": error?.fieldErrors?.email,
                      })}
                      disabled={isPending}
                      name="email"
                    />
                    {error?.fieldErrors?.email && (
                      <span className="text-red-400 text-sm">
                        {Array.isArray(error.fieldErrors.email)
                          ? error.fieldErrors.email[0]
                          : error.fieldErrors.email}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password-input">Password</Label>
                    <Input
                      type="password"
                      placeholder="Your password"
                      id="password-input"
                      className={clsx("py-5", {
                        "border-red-400": error?.fieldErrors?.password,
                      })}
                      disabled={isPending}
                      name="password"
                    />
                    {error?.fieldErrors?.password && (
                      <span className="text-red-400 text-sm">
                        {Array.isArray(error.fieldErrors.password)
                          ? error.fieldErrors.password[0]
                          : error.fieldErrors.password}
                      </span>
                    )}
                  </div>
                  <Button
                    className="w-full mt-6 py-5 rounded-lg"
                    disabled={isPending}
                  >
                    {isPending ? "SIGNING IN" : "SIGN IN"}
                  </Button>
                </form>
              </div>
              <Logo className="max-lg:hidden" />
            </Container>
          </div>
        </>
      )}
    </section>
  );
};
