import { getOverviewCards } from "@/src/actions/members.load";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/src/components/ui/card";
import { LucideType } from "@/src/utils/type.data";
import { UserCheck, UserMinus, UserPlus, Users } from "lucide-react";
import { title } from "process";

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

export async function MembersOverview() {
  const data = await getOverviewCards();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {data.map((item) => {
        return (
          <OverviewCard
            key={title}
            title={item.title}
            description={item.description}
            value={item.value}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
}
