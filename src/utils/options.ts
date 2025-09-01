export const options = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_MEMBERSHIP_KEY}`,
    Origin: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
  },
};
