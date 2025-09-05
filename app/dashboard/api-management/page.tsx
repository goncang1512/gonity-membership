import AuthorizedRedirect from "@/src/components/layouts/api-management/authorized-redirect";
import { GenerateCode } from "@/src/components/layouts/api-management/generate-api-key";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Suspense } from "react";

export default function ApiKeyManagement() {
  return (
    <div className="space-y-8 p-6 w-full mx-auto">
      {/* API Key Management Section */}
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">API Key Management</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manage your API credentials securely. Keep your API key confidential.
        </p>
        <Suspense fallback={<Skeleton className="w-full h-16" />}>
          <GenerateCode />
        </Suspense>
        <p className="mt-1 text-xs text-red-500">
          ⚠️ Never expose your API key in client-side code.
        </p>
      </div>

      {/* Integration Instructions Section */}
      <Suspense fallback={<Skeleton className="w-full h-55" />}>
        <AuthorizedRedirect />
      </Suspense>
    </div>
  );
}
