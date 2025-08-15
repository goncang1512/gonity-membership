import { MemberSearchFilter } from "@/src/components/layouts/members/member-search-filter";
import { MemberTable } from "@/src/components/layouts/members/member-table";
import { MembersOverview } from "@/src/components/layouts/members/members-overview";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Suspense } from "react";

export default async function MembersPage({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const page = (await searchParams)?.page;
  console.log(page);

  return (
    <div className="bg-white p-4">
      <MembersOverview />
      <MemberSearchFilter />
      <Suspense fallback={<Skeleton className="w-full h-52" />}>
        <MemberTable page={page} />
      </Suspense>
    </div>
  );
}
