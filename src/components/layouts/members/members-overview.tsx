import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/src/components/ui/card";
import { LucideType } from "@/src/utils/type.data";
import { UserCheck, UserMinus, UserPlus, Users } from "lucide-react";

interface OverviewCardProps {
  title: string;
  description: string;
  value: number;
  icon: LucideType;
}

function OverviewCard({
  title,
  description,
  value,
  icon: Icon,
}: OverviewCardProps) {
  return (
    <Card className="flex items-center gap-4 py-4">
      <CardHeader className="w-full flex flex-col items-center">
        <CardTitle className="text-base text-neutral-500">{title}</CardTitle>
        <Icon className="w-8 h-8 text-gray-500" />
      </CardHeader>
      <div className="w-full px-4">
        <p className="text-2xl font-bold">{value}</p>
        <CardDescription className="text-sm text-gray-600 px-0">
          {description}
        </CardDescription>
      </div>
    </Card>
  );
}

export function MembersOverview() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <OverviewCard
        title="Total Members"
        description="Platform wide"
        value={12}
        icon={Users}
      />
      <OverviewCard
        title="Active Members"
        description="Currently subscribed"
        value={7}
        icon={UserCheck}
      />
      <OverviewCard
        title="Pending Members"
        description="Awaiting approval"
        value={2}
        icon={UserMinus}
      />
      <OverviewCard
        title="New This Month"
        description="Last 30 days"
        value={0}
        icon={UserPlus}
      />
    </div>
  );
}
