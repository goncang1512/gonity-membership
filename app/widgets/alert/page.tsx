"use client";

import { getStreamOverlay } from "@/src/actions/overlay.load";
import {
  CompAlert,
  ConfigOverlayT,
} from "@/src/components/layouts/overlay/alert-overlay";
import { ably, ablyDonation } from "@/src/lib/ably";
import { useSearchParams } from "next/navigation";
import React, {
  startTransition,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

type Donation = {
  name: string;
  amount: string;
  message: string;
};

// 🔑 Komponen utama (tidak langsung pakai useSearchParams)
export default function OverlayAlertPage() {
  return (
    <Suspense fallback={<></>}>
      <OverlayAlertContent />
    </Suspense>
  );
}

// 🔑 Komponen child (pakai useSearchParams di sini)
function OverlayAlertContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<
    (ConfigOverlayT & { id: string }) | null
  >();
  const [current, setCurrent] = useState<Donation | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const queueRef = useRef<Donation[]>([]);
  const isRunning = useRef(false);

  // ambil konfigurasi overlay
  useEffect(() => {
    const streamKey = searchParams.get("streamKey");
    if (!streamKey) return;

    setLoading(true);
    startTransition(async () => {
      const conf = await getStreamOverlay(String(streamKey));
      console.log({ conf, streamKey });
      setConfig(conf);
      setLoading(false);
    });
  }, [searchParams]);

  // listener dari Ably
  useEffect(() => {
    const onMessage = (msg: any) => {
      queueRef.current.push(msg.data);
      runWorker();
    };

    ably.connection.on("connected", () => {
      console.log("✅ Ably connected");
    });

    ablyDonation.subscribe("new-donate", onMessage);

    return () => {
      ablyDonation.unsubscribe("new-donate", onMessage);
    };
  }, [config]);

  const runWorker = () => {
    if (isRunning.current) return;
    if (!config?.duration) return;

    isRunning.current = true;

    const process = async () => {
      while (queueRef.current.length > 0) {
        const next = queueRef.current.shift()!;
        setCurrent(next);
        setIsVisible(true);

        await new Promise((resolve) =>
          setTimeout(resolve, Number(config.duration))
        );

        setIsVisible(false);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setCurrent(null);
      }

      isRunning.current = false;
    };

    process();
  };

  useEffect(() => {
    if (isVisible && current) {
      const audio = new Audio("/sound/notif-satu.wav");
      audio.play().catch((err) => {
        console.warn("Gagal memutar audio:", err);
      });
    }
  }, [isVisible, current]);

  if (!searchParams.get("streamKey")) return <></>;

  return (
    <div className="p-3 pr-4">
      {loading ? null : current && isVisible ? (
        <CompAlert config={config ?? null} donor={current} />
      ) : null}
    </div>
  );
}
