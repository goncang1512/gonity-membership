import { useQuery } from "@tanstack/react-query";
import { client } from "../lib/hono-client";

export const useGetMembership = () => {
  const query = useQuery({
    queryKey: ["get-membership"],
    queryFn: async () => {
      const res = await client.api.v1.membership.$get(
        {},
        {
          headers: {
            Authorization: `Bearer q7x4ZlmxncrY4Eidxxz3vaRMobwb79wJHE9tIgplypE`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Invalid get books list");
      }

      const data = await res.json();
      return data.data;
    },
  });

  return query;
};
