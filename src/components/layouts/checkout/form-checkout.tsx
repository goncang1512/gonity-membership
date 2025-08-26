"use client";
import React, { createContext, useContext, useState } from "react";
import { Button } from "../../ui/button";
import { authClient } from "@/src/lib/auth-client";
import { client } from "@/src/lib/hono-client";
import { options } from "@/src/utils/options";
import { Loader2 } from "lucide-react";

const FormContext = createContext({} as { loading: boolean });

export default function FormCheckout({
  children,
  tier_id,
  amount,
}: {
  children: React.ReactNode;
  tier_id: string;
  amount: number;
}) {
  const [loading, setLoading] = useState(false);
  const { data } = authClient.useSession();

  const hanldePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const via = formData.get("payment_method");
    const method = formData.get(`method-${via}`);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");

    const payload = {
      tier_id,
      name,
      email,
      phone,
      via,
      method,
      amount,
      member_id: String(data?.user.id),
    };

    try {
      const res = await client.api.v1.payments.charge.$post(
        {
          json: payload,
        },
        options
      );

      const results = await res.json();

      console.log(results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContext.Provider value={{ loading }}>
      <form onSubmit={hanldePayment} className="w-full max-w-2xl space-y-6">
        {children}
      </form>
    </FormContext.Provider>
  );
}

export const FormCheckoutButton = () => {
  const { loading } = useContext(FormContext);

  return (
    <Button
      type="submit"
      size="lg"
      disabled={loading}
      className="px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md hover:opacity-90 cursor-pointer"
    >
      {loading && <Loader2 className="animate-spin" />} Subscribe Now
    </Button>
  );
};
