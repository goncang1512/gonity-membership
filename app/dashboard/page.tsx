import DashboardOverview from "@/src/components/layouts/dashboard/dashboard-overview";
import GrowthMembership from "@/src/components/layouts/dashboard/growth-membership";

export default function DashboardPage() {
  return (
    <div className="p-5 grid gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <DashboardOverview />
      </div>

      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold">Member Growth Over Time</h1>
        <GrowthMembership />
      </div>
    </div>
  );
}
