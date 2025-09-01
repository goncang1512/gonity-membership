"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { Copy, CreditCard, Clock, Check, Store, QrCode } from "lucide-react";
import { Skeleton } from "../../ui/skeleton";

type PaymentDialogProps = {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  result: any;
};

export default function PaymentDialog({
  open,
  result,
  loading,
  onClose,
}: PaymentDialogProps) {
  const [now, setNow] = useState<Date>(new Date());
  const [onCopy, setOnCopy] = useState(false);
  const expires = useMemo(
    () =>
      typeof result?.expiry_time === "string"
        ? new Date(result?.expiry_time)
        : result?.expiry_time,
    [result?.expiry_time]
  );

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [open]);

  const diffMs = Math.max(0, expires?.getTime() - now.getTime());
  const diffSec = Math.floor(diffMs / 1000);

  const hours = Math.floor(diffSec / 3600);
  const minutes = Math.floor((diffSec % 3600) / 60);
  const seconds = diffSec % 60;

  const formattedCountdown = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const formattedCurrency = (value: number) =>
    value?.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  const handleCopy = async (text: string) => {
    try {
      setOnCopy(true);
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Gagal menyalin", err);
    } finally {
      setTimeout(() => {
        setOnCopy(false);
      }, 3000);
    }
  };

  const isExpired = diffMs <= 0;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold">
                Detail Pembayaran
              </DialogTitle>
              <p className="text-sm text-muted-foreground">
                Selesaikan pembayaran sebelum waktu habis.
              </p>
            </div>
          </div>
        </DialogHeader>

        <Card className="px-3 pt-0 shadow-none border-0">
          <CardContent className="px-4 space-y-4">
            {/* Total & Countdown */}
            <div
              className={`${
                result?.payment_type === "credit_card" ? "hidden" : "flex"
              } items-center justify-between`}
            >
              <div>
                <p className="text-sm text-muted-foreground">
                  Total yang harus dibayar
                </p>
                {loading ? (
                  <Skeleton className="w-full h-14 bg-neutral-200 rounded-xs" />
                ) : (
                  <h3 className="text-2xl font-bold">
                    {formattedCurrency(Number(result?.gross_amount ?? 0))}
                  </h3>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                  <Clock size={16} /> Waktu tersisa
                </p>

                {loading ? (
                  <Skeleton className="w-full h-14 bg-neutral-200 rounded-xs" />
                ) : (
                  <div
                    className={`mt-1 font-mono text-lg font-semibold ${
                      isExpired ? "text-destructive" : "text-foreground"
                    }`}
                  >
                    {isExpired ? "EXPIRED" : formattedCountdown}
                  </div>
                )}
              </div>
            </div>

            <Separator
              className={`${
                result?.payment_type === "credit_card" && "hidden"
              }`}
            />

            {/* VA Number & Batas Waktu */}
            <div className="space-y-3">
              {loading ? (
                <Skeleton className="w-full h-20 bg-neutral-200 rounded-xs" />
              ) : (
                <>
                  {result?.payment_type === "bank_transfer" && (
                    <BankNumber
                      handleCopy={handleCopy}
                      onCopy={onCopy}
                      vaNumber={result?.va_numbers[0].va_number}
                    />
                  )}
                  {result?.payment_type === "cstore" && (
                    <StoreNumber
                      handleCopy={handleCopy}
                      onCopy={onCopy}
                      vaNumber={result?.va_numbers[0].payment_code}
                    />
                  )}
                  {result?.payment_type === "qris" && (
                    <QrisImage
                      qr_string={
                        result?.actions.find(
                          (item: any) => item.name === "generate-qr-code"
                        ).url
                      }
                    />
                  )}
                  {result?.payment_type === "credit_card" && (
                    <CardPayment url={result?.redirect_url} />
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <DialogFooter
          className={`${
            result?.payment_type === "credit_card" && "hidden"
          } px-6 py-4 border-t bg-muted/20`}
        >
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <p>Metode:</p>
              {loading ? (
                <Skeleton className="w-40 h-5 rounded-xs bg-neutral-200" /> // kasih width & height jelas
              ) : (
                <p>
                  {result?.payment_type === "bank_transfer"
                    ? "Bank Transfer"
                    : result?.payment_type === "cstore"
                    ? "Over the Counter"
                    : result?.payment_type === "credit_card"
                    ? "Card Payment"
                    : result?.payment_type === "echannel"
                    ? "Echannel"
                    : result?.payment_type === "qris"
                    ? "QRIS"
                    : ""}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={onClose}
              >
                Tutup
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const BankNumber = ({
  vaNumber,
  handleCopy,
  onCopy,
}: {
  vaNumber: string;
  handleCopy: (text: string) => void;
  onCopy: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="flex items-center gap-2 self-start">
        <CreditCard size={16} />
        <span className="text-sm font-medium">VA Number</span>
      </div>
      <div className="flex items-center gap-2">
        <code className="font-mono bg-muted px-2 py-1 rounded text-xl">
          {vaNumber}
        </code>
        <Button
          className="cursor-pointer"
          variant="ghost"
          size="sm"
          onClick={() => handleCopy(vaNumber)}
        >
          {onCopy ? <Check size={14} /> : <Copy size={14} />}
        </Button>
      </div>
    </div>
  );
};

const StoreNumber = ({
  vaNumber,
  handleCopy,
  onCopy,
}: {
  vaNumber: string;
  handleCopy: (text: string) => void;
  onCopy: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="flex items-center gap-2 self-start">
        <Store size={16} />
        <span className="text-sm font-medium">Payment Code</span>
      </div>
      <div className="flex items-center gap-2">
        <code className="font-mono bg-muted px-2 py-1 rounded text-xl">
          {vaNumber}
        </code>
        <Button
          className="cursor-pointer"
          variant="ghost"
          size="sm"
          onClick={() => handleCopy(vaNumber)}
        >
          {onCopy ? <Check size={14} /> : <Copy size={14} />}
        </Button>
      </div>
    </div>
  );
};

const QrisImage = ({ qr_string }: { qr_string: string }) => {
  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="flex items-center gap-2 self-start">
        <QrCode size={16} />
        <span className="text-sm font-medium">QRIS</span>
      </div>
      <div className="flex items-center gap-2">
        <img src={qr_string} alt="" className="h-56" />
      </div>
    </div>
  );
};

const CardPayment = ({ url }: { url: string }) => {
  // callback functions
  var options = {
    onSuccess: function (response: any) {
      window.location.replace("http://midtrans.com?status=success");
    },
    onFailure: function (response: any) {
      // 3ds authentication failure, implement payment failure scenario
    },
    onPending: function (response: any) {
      // transaction is pending, transaction result will be notified later via
      // HTTP POST notification, implement as you wish here
    },
  };

  // trigger `authenticate` function
  (window as any).MembershipNew3ds.authenticate(url, options);

  return (
    <div className="flex flex-col items-center justify-between gap-2">
      <div className="flex items-center gap-2 self-start">
        <CreditCard size={16} />
        <span className="text-sm font-medium">Card Payment</span>
      </div>
      <div className="flex items-center gap-2 w-full ">
        <iframe style={{ height: "59.9vh", width: "100%" }} src={url}></iframe>
      </div>
    </div>
  );
};
