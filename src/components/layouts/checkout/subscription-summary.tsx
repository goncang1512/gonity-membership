import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Check } from "lucide-react";

export default async function SubscriptionSummary({
  tier,
}: {
  tier: {
    id: string;
    name: string;
    price: number;
    duration: number;
    permissions: {
      id: string;
      name: string;
    }[];
  } | null;
}) {
  return (
    <Card className="bg-blue-50 border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Subscription Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-800">{tier?.name}</p>
            <p className="text-sm text-gray-500">{tier?.duration} days</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {(tier?.permissions ?? []).map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-blue-600" />
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-lg font-bold text-blue-600">
            Rp{tier?.price.toLocaleString("id-ID")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
