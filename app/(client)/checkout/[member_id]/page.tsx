import { Card, CardContent } from "@/src/components/ui/card";
import SubscriptionSummary from "@/src/components/layouts/checkout/subscription-summary";
import { Suspense } from "react";
import { Skeleton } from "@/src/components/ui/skeleton";
import { getDetailTier } from "@/src/actions/my-tier";
import DetailsUser from "@/src/components/layouts/checkout/details-user";
import PaymentMethod from "@/src/components/layouts/checkout/payment-method";
import FormCheckout, {
  FormCheckoutButton,
} from "@/src/components/layouts/checkout/form-checkout";
import { redirect } from "next/navigation";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

export default async function CheckoutPage({
  params: valueParams,
}: {
  params: Promise<{ member_id: string }>;
}) {
  const params = await valueParams;

  const res = await getDetailTier(params.member_id);
  const tier = res.data;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (tier?.name === "Free") {
    if (session) {
      return redirect("/");
    } else {
      return redirect("/login");
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        Complete Your Subscription
      </h1>

      <FormCheckout tier_id={params.member_id} amount={tier?.price ?? 0}>
        {/* Subscription Summary */}
        <Suspense fallback={<Skeleton className="w-full h-56" />}>
          <SubscriptionSummary tier={tier} />
        </Suspense>

        {/* User Details */}
        <DetailsUser />

        {/* Payment Method */}
        <PaymentMethod />

        {/* Total + CTA */}
        <Card className="border-blue-100">
          <CardContent className="flex items-center justify-between py-6">
            <div>
              <p className="text-gray-500 text-sm">Total to Pay</p>
              <p className="text-2xl font-bold text-blue-700">
                Rp{tier?.price.toLocaleString("id-ID")}
              </p>
            </div>
            <FormCheckoutButton />
          </CardContent>
        </Card>
      </FormCheckout>
    </div>
  );
}
