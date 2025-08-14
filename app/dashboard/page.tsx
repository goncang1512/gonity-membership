import ChartsComponent from "@/src/components/layouts/dashboard/charts-components";
import DashboardOverview from "@/src/components/layouts/dashboard/dashboard-overview";
import GrowthMembership from "@/src/components/layouts/dashboard/growth-membership";
import LatestActivity from "@/src/components/layouts/dashboard/last-activity";
import MembershipDistribution from "@/src/components/layouts/dashboard/membership-distribution";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="p-5 grid gap-5 max-md:px-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <DashboardOverview />
      </div>

      <div className="grid md:grid-cols-[1fr_0.4fr] items-center gap-3">
        <ChartsComponent />
      </div>

      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold">Recent Member Activity</h1>
        <LatestActivity />
      </div>
    </div>
  );
}
