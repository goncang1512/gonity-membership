import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Filter, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

export function MemberSearchFilter() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
      <div className="flex w-full sm:w-auto gap-2 items-center">
        <Input
          placeholder="Search members by name or email..."
          className="w-full sm:w-64"
        />
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Membership Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="enterprise">Enterprise</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button className="flex items-center gap-2">
        <Plus className="w-4 h-4" /> Add New Member
      </Button>
    </div>
  );
}
