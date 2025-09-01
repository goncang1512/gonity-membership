"use client";

import { generateApiKey } from "@/src/actions/api-key.action";
import { Check, RefreshCw } from "lucide-react";
import React, { startTransition, useEffect, useState } from "react";

export default function FormGenerate({
  apiKey,
  expiresAt,
}: {
  apiKey?: string;
  expiresAt: Date | null;
}) {
  const [loading, setLoading] = useState(false);
  const [onCopy, setOnCopy] = useState(false);
  const [countdown, setCountdown] = useState<string>("");

  // countdown handler
  useEffect(() => {
    if (!expiresAt) {
      setCountdown("Permanent API KEY");
      return;
    }

    const target = new Date(expiresAt).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown("Expired");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

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
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          type="text"
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
      <p className="mt-2 text-xs text-gray-400">{countdown}</p>
    </>
  );
}
