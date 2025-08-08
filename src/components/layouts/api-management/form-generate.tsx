"use client";

import { generateApiKey } from "@/src/actions/api-key.action";
import { Loader2 } from "lucide-react";
import React, { startTransition, useState } from "react";

export default function FormGenerate({ apiKey }: { apiKey?: string }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    startTransition(async () => {
      await generateApiKey();
      setLoading(false);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        readOnly
        value={apiKey}
        className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-mono text-gray-600"
      />
      <button className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100">
        Copy
      </button>
      <button
        disabled={loading}
        type="submit"
        className="rounded-md flex items-center gap-2 cursor-pointer bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
      >
        {loading && <Loader2 className="animate-spin" />}Regenerate
      </button>
    </form>
  );
}
