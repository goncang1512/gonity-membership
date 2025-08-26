export const options = {
  headers: {
    Authorization: `Bearer ${process.env.MEMBERSHIP_API_KEY}`,
    Origin: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
};
