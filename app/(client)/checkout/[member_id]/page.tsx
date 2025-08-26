import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group";
import { Button } from "@/src/components/ui/button";
import { CreditCard, Wallet, Landmark } from "lucide-react";
import SubscriptionSummary from "@/src/components/layouts/checkout/subscription-summary";
import { Suspense } from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getDetailTier } from "@/src/actions/my-tier";
import DetailsUser from "@/src/components/layouts/checkout/details-user";

export default async function CheckoutPage({
  params: valueParams,
}: {
  params: Promise<{ member_id: string }>;
}) {
  const params = await valueParams;

  const res = await getDetailTier(params.member_id);
  const tier = res.data;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        Complete Your Subscription
      </h1>

      <div className="w-full max-w-2xl space-y-6">
        {/* Subscription Summary */}
        <Suspense fallback={<Skeleton className="w-full h-56" />}>
          <SubscriptionSummary tier={tier} />
        </Suspense>

        {/* User Details */}
        <DetailsUser />

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="card" className="space-y-3">
              <Label
                htmlFor="card"
                className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span>Credit/Debit Card</span>
                </div>
              </Label>
              <Label
                htmlFor="wallet"
                className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Wallet className="h-5 w-5 text-gray-600" />
                  <span>E-Wallet (PayPal, Apple Pay)</span>
                </div>
              </Label>
              <Label
                htmlFor="bank"
                className="flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="bank" id="bank" />
                  <Landmark className="h-5 w-5 text-gray-600" />
                  <span>Bank Transfer</span>
                </div>
              </Label>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Total + CTA */}
        <Card className="border-blue-100">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="text-gray-500 text-sm">Total to Pay</p>
              <p className="text-2xl font-bold text-blue-700">
                Rp{tier?.price.toLocaleString("id-ID")}
              </p>
            </div>
            <Button
              size="lg"
              className="px-8 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-md hover:opacity-90"
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
