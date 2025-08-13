"use client";

import { generateApiKey } from "@/src/actions/api-key.action";
import { Check, RefreshCw } from "lucide-react";
import React, { startTransition, useState } from "react";

export default function FormGenerate({ apiKey }: { apiKey?: string }) {
  const [loading, setLoading] = useState(false);
  const [onCopy, setOnCopy] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    startTransition(async () => {
      await generateApiKey();
      setLoading(false);
    });
  };

  const handleCopy = () => {
    try {
      setOnCopy(true);
      navigator.clipboard.writeText(String(apiKey));
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setOnCopy(false);
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="password"
        readOnly
        value={apiKey}
        className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-mono text-gray-600"
      />
      <button
        onClick={handleCopy}
        type="button"
        className="rounded-md border px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
      >
        {onCopy ? <Check size={20} /> : "Copy"}
      </button>
      <button
        disabled={loading}
        type="submit"
        className="rounded-md flex items-center gap-2 cursor-pointer bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
      >
        <RefreshCw size={20} className={`${loading && "animate-spin"}`} />{" "}
        Regenerate
      </button>
    </form>
  );
}
