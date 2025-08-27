"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CreditCard } from "lucide-react";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { AccordionTrigger } from "../../ui/accordion";

// 1. Context untuk RadioGroup
type RadioGroupContextType = {
  value: string | null;
  setValue: (val: string) => void;
};

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined
);

// 2. Provider
export const RadioGroupProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <RadioGroupContext.Provider value={{ value, setValue }}>
      <RadioGroup
        value={value}
        onValueChange={setValue}
        name="payment_method"
        className="space-y-3"
      >
        {children}
      </RadioGroup>
    </RadioGroupContext.Provider>
  );
};

// 3. Hook untuk akses context
export const useRadioGroup = () => {
  const ctx = useContext(RadioGroupContext);
  if (!ctx)
    throw new Error("useRadioGroup must be used inside RadioGroupProvider");
  return ctx;
};

// 4. AccordionCard (child)
export const AccordionCard = () => {
  const { value: selected, setValue } = useRadioGroup();

  const isSelected = selected === "credit_card";

  return (
    <>
      <Label htmlFor={"credit_card"} className="grid bg-red-500">
        <input
          name={`method-credit_card`}
          defaultValue={"credit_card"}
          hidden
          readOnly
          required
        />
        <RadioGroupItem
          hidden
          checked={isSelected}
          onChange={() => setValue("credit_card")}
          value={"credit_card"}
          id={"credit_card"}
        />
      </Label>
      <AccordionTrigger
        onClick={() => setValue("credit_card")}
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:border-blue-500 transition hover:no-underline"
      >
        <div className="flex items-center gap-3">
          <CreditCard className="h-5 w-5 text-gray-600" />
          <span>Credit/Debit Card</span>
        </div>
      </AccordionTrigger>
    </>
  );
};
