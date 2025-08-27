import { Hono } from "hono";
import memberApp from "./membership";
import { verifyApi } from "@/src/middleware/verify-key";
import { allowOrigins } from "@/src/middleware/allow-origins";
import transactionApp from "./transaction";
import paymentApp from "./payment";
import cardClientApp from "./card-client";

const app = new Hono();

// CORS middleware async
app.use("/*", allowOrigins);
app.use("/*", verifyApi);

const routes = app
  .route("/membership", memberApp)
  .route("/transactions", transactionApp)
  .route("/payments", paymentApp)
  .route("/script", cardClientApp);

export default routes;
