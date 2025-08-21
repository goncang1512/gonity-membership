"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { buttonVariants } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { useGetMembership } from "@/src/module/use-get-membership";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

export default function PricingSubscribe() {
  const { data } = useGetMembership();

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {(data ?? []).map((item) => {
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
                {item.permissions.map((permission) => (
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

      {/* <Card>
        <CardHeader>
          <CardTitle>Free</CardTitle>
          <div className="text-2xl font-bold">$0/month</div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✔ Basic Analytics</li>
            <li>✔ Limited API Access</li>
            <li>✔ Standard Support</li>
          </ul>
          <Button variant="outline" className="mt-4 w-full">
            Start Free
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Pro</CardTitle>
          <Badge className="mb-2">Most Popular</Badge>
          <div className="text-2xl font-bold">$49/month</div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✔ Advanced Analytics</li>
            <li>✔ Full API Access</li>
            <li>✔ Priority Support</li>
          </ul>
          <Button className="mt-4 w-full">Choose Pro</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Enterprise</CardTitle>
          <div className="text-2xl font-bold">Custom</div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>✔ All Pro Features</li>
            <li>✔ Dedicated Account Manager</li>
            <li>✔ Custom Integrations</li>
          </ul>
          <Button variant="outline" className="mt-4 w-full">
            Contact Sales
          </Button>
        </CardContent>
      </Card> */}
    </div>
  );
}
