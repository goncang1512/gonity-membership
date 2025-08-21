import { Navbar } from "@/src/components/layouts/navbar";
import React from "react";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
