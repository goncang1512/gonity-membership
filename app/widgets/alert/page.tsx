"use client";
import { getStreamOverlay } from "@/src/actions/overlay.load";
import {
  CompAlert,
  ConfigOverlayT,
} from "@/src/components/layouts/overlay/alert-overlay";
import { ably, ablyDonation } from "@/src/lib/ably";
import { useSearchParams } from "next/navigation";
import React, { startTransition, useEffect, useRef, useState } from "react";

type Donation = {
  name: string;
  amount: string;
  message: string;
};

export default function AlertPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<
    (ConfigOverlayT & { id: string }) | null
  >();
  const [current, setCurrent] = useState<Donation | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // antrian disimpan di ref supaya tidak ke-reset setiap render
  const queueRef = useRef<Donation[]>([]);
  const isRunning = useRef(false);

  // ambil konfigurasi overlay
  useEffect(() => {
    setLoading(true);
    startTransition(async () => {
      const conf = await getStreamOverlay(
        String(searchParams.get("streamKey"))
      );

      console.log({ conf, streamKey: searchParams.get("streamKey") });

      setConfig(conf);
      setLoading(false);
    });
  }, []);

  // listener dari Ably
  useEffect(() => {
    const onMessage = (msg: any) => {
      queueRef.current.push(msg.data);
      runWorker(); // coba jalankan worker kalau lagi idle
    };

    ably.connection.on("connected", () => {
      console.log("✅ Ably connected");
    });

    ablyDonation.subscribe("new-donate", onMessage);

    return () => {
      ablyDonation.unsubscribe("new-donate", onMessage);
    };
  }, [config]);

  // worker loop
  const runWorker = () => {
    if (isRunning.current) return; // lagi jalan → jangan start lagi
    if (!config?.duration) return;

    isRunning.current = true;

    const process = async () => {
      while (queueRef.current.length > 0) {
        const next = queueRef.current.shift()!;
        setCurrent(next);
        setIsVisible(true);

        let sisa = Math.floor(Number(config.duration) / 1000);

        const interval = setInterval(() => {
          sisa -= 1;
        }, 1000);

        await new Promise((resolve) =>
          setTimeout(resolve, Number(config.duration))
        );

        clearInterval(interval);

        // sembunyikan
        setIsVisible(false);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setCurrent(null);
      }

      isRunning.current = false; // kosong → worker berhenti
    };

    process();
  };

  useEffect(() => {
    if (isVisible || current) {
      const audio = new Audio("/sound/notif-satu.wav");

      if (isVisible) {
        audio.play().catch((err) => {
          console.warn("Gagal memutar audio:", err);
        });
      }
    }
  }, [isVisible, current]);

  return (
    <div className="p-3 pr-4">
      {loading ? (
        <></>
      ) : current && isVisible ? (
        <CompAlert config={config ?? null} donor={current} />
      ) : null}
    </div>
  );
}
