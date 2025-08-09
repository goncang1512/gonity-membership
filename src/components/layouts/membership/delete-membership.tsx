"use client";
import { Loader2, Trash } from "lucide-react";
import React, { startTransition, useState } from "react";
import { Button } from "../../ui/button";
import { deleteMembership } from "@/src/actions/membership.action";

export default function DeleteMembership({
  membership_id,
}: {
  membership_id: string;
}) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);

    startTransition(async () => {
      await deleteMembership(membership_id);
      setLoading(false);
    });
  };
  return (
    <div>
      <Button
        disabled={loading}
        onClick={handleDelete}
        variant="outline"
        size="icon"
        className="text-red-500 hover:text-red-600 cursor-pointer"
      >
        {loading ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Trash className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
