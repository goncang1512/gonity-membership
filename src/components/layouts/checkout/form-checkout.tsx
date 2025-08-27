"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Button } from "../../ui/button";
import { authClient } from "@/src/lib/auth-client";
import { Loader2 } from "lucide-react";
import { getCardTokenAsync } from "@/src/utils/get-token-card";
import { client } from "@/src/lib/hono-client";
import { options } from "@/src/utils/options";

export const FormCheckoutContext = createContext(
  {} as {
    loading: boolean;
    cardNumber: string;
    setCardNumber: Dispatch<SetStateAction<string>>;
    exp: string;
    setExp: Dispatch<SetStateAction<string>>;
    cvv: string;
    setCvv: Dispatch<SetStateAction<string>>;
  }
);

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

  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");

  const onSubmit = async (formData: FormData) => {
    const payload = Object.fromEntries(formData.entries());

    const exp = (payload.card_exp as string)?.split("/");
    const card_exp_month = exp?.[0] || "";
    const card_exp_year = exp?.[1] || "";
    const card_number = payload.card_number;
    const card_cvv = payload.card_cvv;

    if (!card_number || !card_exp_month || !card_exp_year || !card_cvv) {
      return false;
    }

    const token_id = await getCardTokenAsync({
      card_number,
      card_exp_month,
      card_exp_year,
      card_cvv,
    });

    return token_id;
  };

  const hanldePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const cardData = await onSubmit(formData);

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
      token_card: cardData,
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
    <FormCheckoutContext.Provider
      value={{
        loading,
        cardNumber,
        setCardNumber,
        exp,
        setExp,
        cvv,
        setCvv,
      }}
    >
      <form onSubmit={hanldePayment} className="w-full max-w-2xl space-y-6">
        {children}
      </form>
    </FormCheckoutContext.Provider>
  );
}

export const FormCheckoutButton = () => {
  const { loading } = useContext(FormCheckoutContext);

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
