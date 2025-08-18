"use client";
import { updateMembership } from "@/src/actions/membership.action";
import { Button } from "@/src/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { useFormStatus } from "react-dom";

export default function FormEdit({
  children,
  tier_id,
}: {
  children: React.ReactNode;
  tier_id: string;
}) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const data = await updateMembership(formData, tier_id);
      if (data.status) {
        router.push("/dashboard/tiers");
      }
    });
  };

  return (
    <form method="POST" onSubmit={handleSubmit} className="space-y-6">
      {children}
    </form>
  );
}

export function CreateMembershipButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="cursor-pointer" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" /> : <Plus />}
      Save Plan
    </Button>
  );
}
