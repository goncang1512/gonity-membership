"use client";
import { useEffect } from "react";

export function CheckoutScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/assets/deliver.min.js`;
    script.async = true;
    script.setAttribute("api-key", process.env.NEXT_PUBLIC_MEMBERSHIP_KEY!);
    script.setAttribute("url-api", process.env.NEXT_PUBLIC_BETTER_AUTH_URL!);
    script.setAttribute("data-environment", "sandbox");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Tidak render apa-apa, cuma inject script
}
