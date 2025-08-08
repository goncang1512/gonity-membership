import { Hono } from "hono";

import authApp from "./auth";

// export const runtime = "edge";
const app = new Hono().basePath("/api");

const routes = app.route("/auth", authApp);

export { app, routes };
