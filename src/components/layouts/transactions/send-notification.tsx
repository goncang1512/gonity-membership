"use client";
import { sendNotification } from "@/src/actions/subscribe.action";
import { Loader2 } from "lucide-react";
import React, { startTransition, useState } from "react";
import { Button } from "../../ui/button";

export default function SendNotification({
  transaction_id,
}: {
  transaction_id: string;
}) {
  const [loading, setLoading] = useState(false);

  const sendNow = async () => {
    setLoading(true);

    startTransition(async () => {
      await sendNotification(transaction_id);
      setLoading(false);
    });
  };

  return (
    <Button
      variant={"ghost"}
      onClick={sendNow}
      disabled={loading}
      className="w-full cursor-pointer"
    >
      {loading && <Loader2 className="animate-spin" />} Send
    </Button>
  );
}
