import useAuthStore from "@/store";
import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
  isLoggedIn: boolean;
};

export default function Layout({ children, isLoggedIn }: Props) {
  const router = useRouter();
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth");
    } else {
      router.push("/dashboard");
    }
    return () => {};
  }, [isLoggedIn]);

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <main>{children}</main>
    </>
  );
}
