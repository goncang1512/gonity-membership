"use client";
import React, { startTransition, useState } from "react";
import { Button } from "../../ui/button";
import { useOverlay } from "@/src/utils/context/overlay-provider";
import { updateAlert } from "@/src/actions/overlay.load";
import { Loader2 } from "lucide-react";

export default function FormEditAlert() {
  const { config } = useOverlay();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    startTransition(async () => {
      await updateAlert(config);

      setLoading(false);
    });
  };

  return (
    <Button
      disabled={loading}
      onClick={handleSave}
      className="w-max px-10 cursor-pointer"
    >
      {loading && <Loader2 className="animate-spin" />} Save Alert
    </Button>
  );
}
