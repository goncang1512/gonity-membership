import { Hono } from "hono";
import memberApp from "./membership";
import { verifyApi } from "@/src/middleware/verify-key";
import { allowOrigins } from "@/src/middleware/allow-origins";

const app = new Hono();

app.use("/*", verifyApi);
// CORS middleware async
app.use("/*", allowOrigins);

app.route("/membership", memberApp);

export default app;
