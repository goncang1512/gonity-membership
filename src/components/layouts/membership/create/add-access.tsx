"use client";
import { createPermission } from "@/src/actions/permission.action";
import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import { Loader2, Plus } from "lucide-react";
import React, { startTransition, useState } from "react";

export default function AddAccess() {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    startTransition(async () => {
      const formData = new FormData(e.currentTarget);
      const results = await createPermission(formData);
      if (results.status) {
        setShowDialog(false);
      }
      setLoading(false);
    });
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger
        className={cn(
          buttonVariants({
            variant: "default",
            className: "cursor-pointer",
          })
        )}
      >
        <Plus size={20} /> Add Access Feture
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buat Perizinan Kustom</DialogTitle>
          <DialogDescription>
            Tambahkan dan kelola fitur kustom untuk perizinan pengguna.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreate} className="space-y-4">
          <Input name="name" placeholder="Misalnya, 'Ekspor Data'" />
          <Input
            name="description"
            placeholder="Misalnya, 'Izinkan pengguna mengekspor data ke CSV.'"
          />
          <Button disabled={loading} className="w-full cursor-pointer">
            {loading && <Loader2 className="animate-spin" />} Tambahkan Fitur
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
