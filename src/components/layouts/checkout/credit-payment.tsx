"use client";

import React, { useContext, useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { CreditCard, Calendar, Shield, Check } from "lucide-react";
import { FormCheckoutContext } from "./form-checkout";

export default function CreditPayment() {
  const { cardNumber, setCardNumber, exp, setExp, cvv, setCvv } =
    useContext(FormCheckoutContext);

  // format #### #### #### ####
  const handleCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 19); // support up to 19 for some cards
    const grouped = digits.match(/.{1,4}/g)?.join(" ") ?? "";
    setCardNumber(grouped);
  };

  // format MM/YY
  const handleExp = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 6); // max 6 angka (MMYYYY)
    let mm = digits.slice(0, 2);
    let yyyy = digits.slice(2, 6);

    // jika input 1 digit dan lebih besar dari 1 (2-9), tambahkan 0 di depan
    if (mm.length === 1 && Number(mm) > 1) {
      mm = `0${mm}`;
      yyyy = digits.slice(1, 5);
    }

    // validasi bulan
    if (mm.length === 2) {
      const n = Number(mm);
      if (n === 0) mm = "01";
      if (n > 12) mm = "12";
    }

    // jika user cuma ketik 2 digit tahun (misal 25 → 2025)
    if (yyyy.length === 2) {
      const currentYear = new Date().getFullYear().toString().slice(0, 2); // "20"
      yyyy = currentYear + yyyy;
    }

    setExp(yyyy ? `${mm}/${yyyy}` : mm);
  };

  // CVV 3-4 digits
  const handleCvv = (v: string) => {
    setCvv(v.replace(/\D/g, "").slice(0, 4));
  };

  return (
    <div className="w-full grid gap-5">
      {/* Card Number */}
      <div className="space-y-2 w-full">
        <Label htmlFor="card_number" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Number
        </Label>
        <Input
          id="card_number"
          name="card_number"
          placeholder="1234 5678 9012 3456"
          inputMode="numeric"
          autoComplete="cc-number"
          value={cardNumber}
          onChange={(e) => handleCardNumber(e.target.value)}
          className="text-base tracking-wider"
          required
        />
      </div>

      {/* Expiry & CVV */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="card_exp" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Expiry (MM/YYYY)
          </Label>
          <Input
            id="card_exp"
            name="card_exp"
            placeholder="MM/YY"
            inputMode="numeric"
            autoComplete="cc-exp"
            value={exp}
            onChange={(e) => handleExp(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card_cvv" className="flex items-center gap-2">
            <Shield className="h-4 w-4" /> CVV
          </Label>
          <Input
            id="card_cvv"
            name="card_cvv"
            placeholder="123"
            inputMode="numeric"
            autoComplete="cc-csc"
            value={cvv}
            onChange={(e) => handleCvv(e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
}
