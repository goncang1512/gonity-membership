"use client";
import { useOverlay } from "@/src/utils/context/overlay-provider";
import React from "react";

export type ConfigOverlayT = {
  bgColor: string;
  highlightColor: string;
  textColor: string;
  borderless: boolean;
  fontWeight: string;
  fontSize: string;
  fontFamily: string;
  templateText: string;
  duration: number;
  shadow: string;
};

export function AlertOverlay() {
  const { config } = useOverlay();

  return (
    <CompAlert
      config={config}
      donor={{
        name: "Mumu",
        amount: "Rp12.000",
        message: "Semangat terus! 💖",
      }}
    />
  );
}

export const CompAlert = ({
  donor,
  config,
}: {
  config: (ConfigOverlayT & { id?: string }) | null;
  donor: {
    name: string;
    amount: string;
    message: string;
  };
}) => {
  return (
    <div
      className={`rounded-md shadow-lg p-6 text-center transition-all duration-500`}
      style={{
        backgroundColor: config?.bgColor,
        color: config?.textColor,
        fontWeight: config?.fontWeight as any,
        fontSize: config?.fontSize,
        fontFamily:
          config?.fontFamily === "default" ? "sans-serif" : config?.fontFamily,
        border: config?.borderless
          ? "none"
          : `3px solid ${config?.highlightColor}`,
        boxShadow: config?.shadow,
      }}
    >
      <span
        className="mr-2 font-bold"
        style={{ color: config?.highlightColor }}
      >
        {donor?.name}
      </span>
      {config?.templateText}{" "}
      <span className="font-bold" style={{ color: config?.highlightColor }}>
        {donor?.amount}
      </span>
      <div className="mt-2">{donor?.message}</div>
    </div>
  );
};
