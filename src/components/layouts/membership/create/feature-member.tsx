import {
  deletePermission,
  getPermission,
} from "@/src/actions/permission.action";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import React from "react";
import { DeleteFeatureButton } from "./delete-permission";

export default async function FeatureMember() {
  const results = await getPermission();

  return (
    <div className="space-y-2">
      <Label>Features Included</Label>
      <div className="grid grid-cols-2 gap-2">
        {results.data.map((feature) => {
          return (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox name={`checkbox-${feature.id}`} id={feature.id} />
              <Label htmlFor={feature.name} className="text-sm font-normal">
                {feature.name}
              </Label>

              <DeleteFeatureButton permission_id={feature.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
