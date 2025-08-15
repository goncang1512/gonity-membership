"use client";

import { useRef, useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Label } from "@/src/components/ui/label";
import { UploadCloud } from "lucide-react";

export default function MembershipBadgeUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <Label>Membership Badge/Icon</Label>
      <div className="flex items-center space-x-4">
        <div className="size-32 rounded-md border flex items-center justify-center bg-gray-50 overflow-hidden">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <UploadCloud className="w-full h-full text-gray-400" />
          )}
        </div>

        {/* input file hidden */}
        <input
          type="file"
          name="badge"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setPreview(imageUrl);
              console.log("Selected file:", file);
            }
          }}
        />

        {/* tombol trigger untuk klik file input */}
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadCloud className="w-4 h-4 mr-2" /> Upload Image
        </Button>
      </div>
    </div>
  );
}
