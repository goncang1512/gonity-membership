import { client } from "../lib/hono-client";
import { options } from "../utils/options";

export const getMyTierMembership = async () => {
  try {
    const res = await client.api.v1.membership.$get({}, options);

    if (!res.ok) {
      throw new Error("Invalid get books list");
    }

    const data = await res.json();

    return {
      status: true,
      statusCode: 200,
      message: "Success get my tier membership",
      data: data.data,
    };
  } catch (error) {
    return {
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};

export const getDetailTier = async (tier_id: string) => {
  try {
    const res = await client.api.v1.membership[":tier_id"].$get(
      {
        param: {
          tier_id,
        },
      },
      options
    );

    if (!res.ok) {
      throw new Error("Invalid get membership tier list");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    return {
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
      data: null,
    };
  }
};
