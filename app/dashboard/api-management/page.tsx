import AuthorizedRedirect from "@/src/components/layouts/api-management/authorized-redirect";
import { GenerateCode } from "@/src/components/layouts/api-management/generate-api-key";
import { Skeleton } from "@/src/components/ui/skeleton";
import { Suspense } from "react";

export default function ApiKeyManagement() {
  return (
    <div className="space-y-8 p-6 w-full mx-auto">
      {/* API Key Management Section */}
      <Suspense fallback={<Skeleton className="w-full h-55" />}>
        <GenerateCode />
      </Suspense>

      {/* Integration Instructions Section */}
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Authorized redirect URIs</h2>
        <p className="text-sm text-gray-500 mb-4">
          For use with requests from a web server
        </p>
        <Suspense fallback={<Skeleton className="w-full h-55" />}>
          <AuthorizedRedirect />
        </Suspense>

        {/* Tabs */}
        {/* <div className="mb-4 flex gap-2">
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
            cURL
          </button>
          <button className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
            JavaScript
          </button>
          <button className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
            Laravel (PHP)
          </button>
        </div> */}

        {/* Code Example */}
        {/* <div className="rounded-md bg-gray-900 p-4 text-sm text-white font-mono overflow-x-auto">
          <pre>
            {`curl -X POST \\
  https://api.example.com/v1/payments \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "amount": 1000,
    "currency": "usd",
    "description": "Payment for order #123"
}'`}
          </pre>
        </div> */}
      </div>
    </div>
  );
}
