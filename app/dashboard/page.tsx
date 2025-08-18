import ChartsComponent from "@/src/components/layouts/dashboard/charts-components";
import DashboardOverview from "@/src/components/layouts/dashboard/dashboard-overview";
import LatestActivity from "@/src/components/layouts/dashboard/last-activity";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="p-5 grid gap-5 max-md:px-2">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="w-full h-36" />
              ))}
            </div>
          }
        >
          <DashboardOverview />
        </Suspense>
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
