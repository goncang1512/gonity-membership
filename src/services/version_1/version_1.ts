import { Hono } from "hono";
import memberApp from "./membership";
import { verifyApi } from "@/src/middleware/verify-key";

const app = new Hono();

app.use("/*", verifyApi);

app.route("/membership", memberApp);

export default app;
