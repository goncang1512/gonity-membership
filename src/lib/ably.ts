import Ably from "ably";

export const ably = new Ably.Realtime({
  key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
  clientId: "user-" + Math.random().toString(36).slice(2),
});

export const ablyDonation = ably.channels.get("donation");
