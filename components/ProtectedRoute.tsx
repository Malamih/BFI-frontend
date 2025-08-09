"use client";

import { useCheckAuth } from "@/services/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [canLoad, setCanLoad] = useState(false);
  const { mutate, error } = useCheckAuth(() => {
    setCanLoad(true);
  });
  const router = useRouter();
  useEffect(() => {
    if (error) {
      router.push("/auth");
    }
  }, [error]);
  useEffect(() => {
    mutate({});
  }, []);
  return <>{children}</>;
};
