import gonityFy from "../lib/gonityfy";

export const getMyTierMembership = async () => {
  try {
    const data = await gonityFy.getMyMembership();

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
    const data = await gonityFy.getDetailMemberhip({ membership_id: tier_id });

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
