import React from "react";
import GrowthMembership from "./growth-membership";
import MembershipDistribution from "./membership-distribution";
import { getAnalyticMembership } from "@/src/actions/membership.action";
import gonityFy from "@/src/lib/gonityfy";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Medal } from "lucide-react";
import { Button } from "../../ui/button";

export default async function ChartsComponent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const permission = await gonityFy.checkMembership({
    user_id: String(session?.user.id),
    permission: ["Advanced Analytics"],
  });
  const data = await getAnalyticMembership();

  return (
    <>
      <div className="flex  flex-col h-full gap-2">
        <h1 className="text-2xl font-semibold">Member Growth Over Time</h1>
        {!permission.data ? (
          <div className="h-full bg-card text-card-foreground flex flex-col items-center justify-center gap-6 rounded-xl border py-6 shadow-sm">
            <Card className="max-w-md mx-auto text-center p-6 border-0 shadow-none">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <Medal className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold">
                  Member Growth Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  You don’t have a membership yet. Please subscribe first to
                  access this feature.
                </p>
                <Link
                  href={"/#pricing"}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Buy Membership
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <GrowthMembership data={data.data?.statsLine ?? []} />
        )}
      </div>
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold">Membership Distribution</h1>
        <MembershipDistribution data={data.data?.pieChart ?? []} />
      </div>
    </>
  );
}
