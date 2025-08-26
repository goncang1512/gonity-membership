import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Label } from "../../ui/label";
import { CreditCard, Landmark, QrCode, Store, Wallet } from "lucide-react";
import { client } from "@/src/lib/hono-client";
import { options } from "@/src/utils/options";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

export default async function PaymentMethod() {
  const res = await client.api.v1.payments.via.$get({}, options);
  const result = await res.json();

  const paymentsMethod = [
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      method: result.data?.bankTransfer ?? [],
      icon: Landmark,
    },
    {
      id: "cstore",
      name: "Over the Counter",
      method: result.data?.cstore ?? [],
      icon: Store,
    },
    {
      id: "ewallet",
      name: "E-Wallet",
      method: result.data?.ewallet ?? [],
      icon: Wallet,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Payment Method
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup name="payment_method" className="space-y-3">
          <Accordion type="single" collapsible className="grid gap-5">
            {paymentsMethod.map((has) => {
              return (
                <AccordionItem
                  key={has.id}
                  value={has.id}
                  className="border rounded-lg last:border-b-1"
                >
                  <AccordionTrigger className="flex items-center justify-between px-4 py-3 cursor-pointer hover:border-blue-500 transition hover:no-underline">
                    <div className="flex items-center gap-3">
                      <has.icon className="h-5 w-5 text-gray-600" />
                      <span>{has.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="grid md:grid-cols-2 grid-cols-1">
                    {has.method.map((item) => {
                      return (
                        <Label
                          key={item.id}
                          htmlFor={item.id}
                          className="flex items-center justify-between px-4 py-3 cursor-pointer transition"
                        >
                          <div className="flex items-center gap-3">
                            <input
                              name={`method-${item.id}`}
                              defaultValue={has.id}
                              hidden
                              readOnly
                              required
                            />
                            <RadioGroupItem value={item.id} id={item.id} />
                            <img
                              className="w-12"
                              src={String(item.image)}
                              alt={item.name}
                            />
                            <span>{item.name}</span>
                          </div>
                        </Label>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>

          <Label
            htmlFor="qris"
            className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer  transition"
          >
            <div className="flex items-center gap-3">
              <input
                name={`method-qris`}
                defaultValue="qris"
                hidden
                readOnly
                required
              />
              <RadioGroupItem value="qris" id="qris" />
              <QrCode className="h-5 w-5 text-gray-600" />
              <span>QRIS</span>
            </div>
          </Label>

          <Label
            htmlFor="card"
            className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer  transition"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="card" id="card" />
              <CreditCard className="h-5 w-5 text-gray-600" />
              <span>Credit/Debit Card</span>
            </div>
          </Label>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
