"use client";
import { deleteMember } from "@/src/actions/membership.action";
import { Loader2, Trash } from "lucide-react";
import React, { startTransition, useState } from "react";

export default function DeleteMember({
  subscribe_id,
}: {
  subscribe_id: string;
}) {
  const [loading, setLoading] = useState(false);

  const deleteMembership = async () => {
    setLoading(true);

    startTransition(async () => {
      await deleteMember(subscribe_id);
      setLoading(false);
    });
  };

  return (
    <button
      className="cursor-pointer"
      disabled={loading}
      onClick={deleteMembership}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={16} />
      ) : (
        <Trash className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700" />
      )}
    </button>
  );
}
