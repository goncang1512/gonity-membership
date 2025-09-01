import FormGenerate from "./form-generate";
import { getApiKey } from "@/src/actions/api-key.action";

export async function GenerateCode() {
  const apiKey = await getApiKey();

  return (
    <FormGenerate
      apiKey={apiKey.data?.key ?? ""}
      expiresAt={apiKey.data?.expiresAt || null}
    />
  );
}
