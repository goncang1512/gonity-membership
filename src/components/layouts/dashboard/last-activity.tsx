"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";

interface Activity {
  id: number;
  name: string;
  avatarUrl?: string;
  action: string;
  type: "joined" | "cancelled" | "upgraded";
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: 1,
    name: "Alice Johnson",
    avatarUrl: "/avatars/alice.jpg",
    action: "Signed up for Pro plan",
    type: "joined",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatarUrl: "/avatars/bob.jpg",
    action: "Cancelled Essentials plan",
    type: "cancelled",
    timestamp: "Yesterday",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatarUrl: "/avatars/charlie.jpg",
    action: "Upgraded from Essentials to Pro",
    type: "upgraded",
    timestamp: "2 days ago",
  },
  {
    id: 4,
    name: "Diana Ross",
    avatarUrl: "/avatars/diana.jpg",
    action: "Signed up for Enterprise plan",
    type: "joined",
    timestamp: "3 days ago",
  },
  {
    id: 5,
    name: "Eve Adams",
    avatarUrl: "/avatars/eve.jpg",
    action: "Cancelled Pro plan",
    type: "cancelled",
    timestamp: "4 days ago",
  },
  {
    id: 6,
    name: "Frank White",
    avatarUrl: "/avatars/frank.jpg",
    action: "Signed up for Essentials plan",
    type: "joined",
    timestamp: "5 days ago",
  },
];

export default function LatestActivity() {
  return (
    <Card className="rounded-xl border border-neutral-200 shadow-sm">
      <CardHeader>
        <CardTitle>Latest Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between px-4 py-3"
            >
              {/* Member Info */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activity.avatarUrl} alt={activity.name} />
                  <AvatarFallback>
                    {activity.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{activity.name}</p>
                  <p className="text-sm text-neutral-500">{activity.action}</p>
                </div>
              </div>

              {/* Type & Timestamp */}
              <div className="flex items-center gap-4">
                <Badge
                  variant="secondary"
                  className={
                    activity.type === "joined"
                      ? "bg-blue-100 text-blue-600"
                      : activity.type === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }
                >
                  {activity.type}
                </Badge>
                <span className="text-sm text-neutral-500">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
