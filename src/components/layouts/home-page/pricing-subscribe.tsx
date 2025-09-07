import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { buttonVariants } from "../../ui/button";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import gonityFy from "@/src/lib/gonityfy";

export default async function PricingSubscribe() {
  const data = await gonityFy.getMyMembership();

  if (!data) {
    return (
      <div className="flex justify-center">
        <p>NOT FOUND</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {(data.data ?? []).map((item: any) => {
        const buttonText =
          item.name === "Enterprise"
            ? "Contact Sales"
            : item.name === "Pro"
            ? "Choose Pro"
            : "Start Free";

        return (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              {item.name === "Pro" && (
                <Badge className="mb-2">Most Popular</Badge>
              )}
              <div className="text-2xl font-bold">
                Rp{item.price.toLocaleString("id-ID")}/month
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {item.permissions.map((permission: any) => (
                  <li key={permission.id}>✔ {permission.name}</li>
                ))}
              </ul>
              <Link
                href={`/checkout/${item.id}`}
                className={cn(
                  buttonVariants({
                    variant: item.name === "Pro" ? "default" : "outline",
                    className: "mt-4 w-full",
                  })
                )}
              >
                {buttonText}
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
