import { Hono } from "hono";
import memberApp from "./membership";
import { verifyApi } from "@/src/middleware/verify-key";
import { allowOrigins } from "@/src/middleware/allow-origins";
import transactionApp from "./transaction";
import paymentApp from "./payment";

const app = new Hono();

// CORS middleware async
app.use("/*", allowOrigins);

app.use("/*", verifyApi);

app.route("/membership", memberApp);
app.route("/transactions", transactionApp);
app.route("/payments", paymentApp);

export default app;
