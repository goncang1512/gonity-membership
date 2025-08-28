"use client";
import { Navbar } from "@/src/components/layouts/navbar";
import React, { useEffect } from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/assets/deliver.min.js`;
    script.async = true;
    script.setAttribute("api-key", process.env.NEXT_PUBLIC_MEMBERSHIP_KEY!);
    script.setAttribute("url-api", process.env.NEXT_PUBLIC_BETTER_AUTH_URL!);

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
