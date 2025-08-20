import { Hono } from "hono";

import authApp from "./auth";
import version_1 from "./version_1/version_1";
import prisma from "../lib/prisma-client";
import cardClientApp from "./version_1/card-client";

// export const runtime = "edge";
const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", authApp)
  .route("/v1", version_1)
  .route("/client", cardClientApp);

export { app, routes };
