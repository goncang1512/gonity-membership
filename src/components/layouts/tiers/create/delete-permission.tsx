"use client";

import { deletePermission } from "@/src/actions/permission.action";
import { Button } from "@/src/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import { startTransition, useState } from "react";

export function DeleteFeatureButton({
  permission_id,
}: {
  permission_id: string;
}) {
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    startTransition(async () => {
      await deletePermission(permission_id);
      setPending(false);
    });
  };

  return (
    <Button
      onClick={handleDelete}
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
