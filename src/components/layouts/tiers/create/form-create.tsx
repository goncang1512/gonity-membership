"use client";
import { createMembership } from "@/src/actions/membership.action";
import { Button } from "@/src/components/ui/button";
import { Loader2, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { startTransition } from "react";
import { useFormStatus } from "react-dom";

export default function FormCreate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const data = await createMembership(formData);
      if (data.status) {
        router.push("/dashboard/tiers");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
