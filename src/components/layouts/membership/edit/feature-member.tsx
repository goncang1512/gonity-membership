import {
  deletePermission,
  getPermission,
} from "@/src/actions/permission.action";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Label } from "@/src/components/ui/label";
import React from "react";
import { DeleteFeatureButton } from "../create/delete-permission";

export default async function FeatureMemberEdit({
  feature_id,
}: {
  feature_id: { id: string; name: string }[];
}) {
  const results = await getPermission();

  const deleteFeture = async (formData: FormData) => {
    "use server";
    await deletePermission(String(formData.get("permission_id")));
  };

  return (
    <div className="space-y-2">
      <Label>Features Included</Label>
      <div className="grid grid-cols-2 gap-2">
        {results.data.map((feature) => {
          const isFeat = feature_id.some(
            (item) => String(item.id) === String(feature.id)
          );
          return (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                defaultChecked={isFeat}
                name={`checkbox-${feature.id}`}
                id={feature.id}
              />
              <Label htmlFor={feature.name} className="text-sm font-normal">
                {feature.name}
              </Label>

              <form method="POST" action={deleteFeture}>
                <input type="hidden" name="permission_id" value={feature.id} />
                <DeleteFeatureButton />
              </form>
            </div>
          );
        })}
      </div>
    </div>
  );
}
