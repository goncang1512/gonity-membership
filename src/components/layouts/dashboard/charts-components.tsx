import React from "react";
import GrowthMembership from "./growth-membership";
import MembershipDistribution from "./membership-distribution";
import { getAnalyticMembership } from "@/src/actions/membership.action";

export default async function ChartsComponent() {
  const data = await getAnalyticMembership();

  return (
    <>
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold">Member Growth Over Time</h1>
        <GrowthMembership data={data.data?.statsLine ?? []} />
      </div>
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold">Membership Distribution</h1>
        <MembershipDistribution data={data.data?.pieChart ?? []} />
      </div>
    </>
  );
}
