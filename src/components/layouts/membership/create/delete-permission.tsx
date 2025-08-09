"use client";

import { Button } from "@/src/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { useFormStatus } from "react-dom";

export function DeleteFeatureButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="outline"
      className="cursor-pointer"
      disabled={pending}
    >
      {pending ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Trash className="text-red-500" />
      )}
    </Button>
  );
}
