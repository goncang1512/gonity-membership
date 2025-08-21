import { hc } from "hono/client";
import { AppType } from "../services";

const client = hc<AppType>(process.env.NEXT_PUBLIC_BETTER_AUTH_URL!);

export { client };
