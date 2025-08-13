import React from "react";
import { Button } from "../../ui/button";
import { Calendar, Filter, Search } from "lucide-react";
import { Input } from "../../ui/input";

export default function FilterTransactions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-[0.3fr_0.3fr_1fr_0.3fr] gap-2">
      <Button variant="outline" className="flex items-center gap-2">
        <Calendar className="w-4 h-4" /> Select date range
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        <Filter className="w-4 h-4" /> Filter by Status
      </Button>
      <div className="max-md:col-span-2 col-span-1 flex gap-2">
        <div className="flex-1">
          <Input placeholder="Search by Customer Name..." />
        </div>
        <Button>
          <Search className="md:hidden flex" />
          <span className="md:flex hidden">Apply Filters</span>
        </Button>
      </div>
      <Button variant="outline" className="max-md:col-span-2">
        Clear Filters
      </Button>
    </div>
  );
}
