import { Hono } from "hono";

const cardClientApp = new Hono();

cardClientApp.get("/", async (c) => {
  const environment = c.req.query("environment");

  const midtrans_client =
    environment === "sandbox"
      ? process.env.MIDTRANS_CLIENT_KEY
      : process.env.MIDTRANS_CLIENT_KEY_PRODUCTION;

  return c.json({
    status: true,
    statusCode: 200,
    message: "Success get midtrans client key",
    key: midtrans_client,
  });
});

export default cardClientApp;
