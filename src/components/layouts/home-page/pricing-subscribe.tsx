"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { buttonVariants } from "../../ui/button";
import { Badge } from "../../ui/badge";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import gonityFy from "@/src/lib/gonityfy";
import { MyMembershipRes } from "@/src/utils/types/type-gonityfy";
import { Skeleton } from "../../ui/skeleton";

export default function PricingSubscribe() {
  const [data, setData] = useState<MyMembershipRes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await gonityFy.getMyMembership();

        setData(res.data ?? []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-56" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {(data ?? []).map((item: any) => {
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
