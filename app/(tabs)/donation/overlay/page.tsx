import { getMyOverlay } from "@/src/actions/overlay.load";
import { AlertOverlay } from "@/src/components/layouts/overlay/alert-overlay";
import EditAlert from "@/src/components/layouts/overlay/edit-alert";
import FormEditAlert from "@/src/components/layouts/overlay/form-edit";
import SetUpAlert from "@/src/components/layouts/overlay/setup-alert";
import OverlayProvider from "@/src/utils/context/overlay-provider";

export default async function OverlayEditor() {
  const overlay = await getMyOverlay();
  return (
    <OverlayProvider overlay={overlay}>
      <div className="grid gap-6 p-6">
        {/* PREVIEW */}
        <AlertOverlay />

        {/* EDITOR FORM */}
        <EditAlert>
          <FormEditAlert />
        </EditAlert>

        <SetUpAlert />
      </div>
    </OverlayProvider>
  );
}
