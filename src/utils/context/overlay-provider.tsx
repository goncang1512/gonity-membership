"use client";
import { ConfigOverlayT } from "@/src/components/layouts/overlay/alert-overlay";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export const OverlayContext = createContext(
  {} as {
    setConfig: Dispatch<SetStateAction<ConfigOverlayT & { id: string }>>;
    config: ConfigOverlayT & { id: string };
  }
);

export default function OverlayProvider({
  overlay,
  children,
}: {
  children: React.ReactNode;
  overlay: ConfigOverlayT & { id: string };
}) {
  const [config, setConfig] = useState<ConfigOverlayT & { id: string }>({
    id: "",
    bgColor: "#1e293b",
    highlightColor: "#f97316",
    textColor: "#f1f5f9",
    borderless: true,
    fontWeight: "600",
    fontSize: "20px",
    fontFamily: "monospace",
    templateText: "baru saja mendukung kamu dengan",
    duration: 5000,
    shadow: "10px 10px 0px rgba(249,115,22,1)",
  });

  useEffect(() => {
    if (overlay) {
      setConfig({ ...overlay });
    }
  }, [overlay]);

  return (
    <OverlayContext.Provider value={{ config, setConfig }}>
      {children}
    </OverlayContext.Provider>
  );
}

export const useOverlay = () => useContext(OverlayContext);
