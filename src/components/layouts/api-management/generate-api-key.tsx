import FormGenerate from "./form-generate";
import { getApiKey } from "@/src/actions/api-key.action";

export async function GenerateCode() {
  const apiKey = await getApiKey();

  return (
    <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
      <h2 className="text-lg font-semibold">API Key Management</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage your API credentials securely. Keep your API key confidential.
      </p>
      <FormGenerate apiKey={apiKey?.key} />
      <p className="mt-2 text-xs text-gray-400">
        Last used: June 12, 2024 at 10:30 AM (UTC)
      </p>
      <p className="mt-1 text-xs text-red-500">
        ⚠️ Never expose your API key in client-side code.
      </p>
    </div>
  );
}
