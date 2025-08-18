"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../../ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function MemberSearchFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterData, setFilterData] = useState<{
    status: string | undefined;
    name: string | undefined;
  }>({
    status: undefined,
    name: undefined,
  });

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filterData.name) {
      params.set("name", String(filterData.name));
    } else {
      params.delete("name");
    }

    if (filterData.status && filterData.status !== "all") {
      params.set("status", String(filterData.status));
    } else {
      params.delete("status");
    }

    return params.toString();
  }, [searchParams, filterData]);

  const handleClick = () => {
    router.push(`/dashboard/members?${createQueryString()}`);
  };

  const handleReset = () => {
    setFilterData({ name: "", status: "" });
    router.push("/dashboard/members");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.3fr_1fr_0.3fr] gap-2 mb-5">
      <Select
        value={filterData.status}
        onValueChange={(value) =>
          setFilterData({ ...filterData, status: value })
        }
      >
        <SelectTrigger className="w-full capitalize">
          <Filter className="w-4 h-4" />
          <SelectValue className="capitalize" placeholder="Filter by Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {["all", "active", "expired", "canceled", "pending"].map(
              (value) => (
                <SelectItem value={value} className="capitalize">
                  {value}
                </SelectItem>
              )
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="max-md:col-span-2 col-span-1 flex gap-2">
        <div className="flex-1">
          <Input
            value={filterData.name}
            onChange={(e) =>
              setFilterData({ ...filterData, name: e.target.value })
            }
            placeholder="Search by Customer Name..."
          />
        </div>
        <Button onClick={handleClick} className="cursor-pointer">
          <Search className="md:hidden flex" />
          <span className="md:flex hidden">Apply Filters</span>
        </Button>
      </div>
      <Button
        onClick={handleReset}
        variant="outline"
        className="max-md:col-span-2 cursor-pointer"
      >
        Clear Filters
      </Button>
    </div>
  );
}
