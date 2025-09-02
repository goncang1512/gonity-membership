import { GonityFy } from "../utils/gontiy-membership";

const gonityFy = new GonityFy({
  apiKey: process.env.NEXT_PUBLIC_MEMBERSHIP_KEY || "",
  environment: process.env.NEXT_PUBLIC_ENV || "",
});

export default gonityFy;
