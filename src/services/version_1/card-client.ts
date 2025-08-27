import { Hono } from "hono";

const cardClientApp = new Hono().post("/", async (c) => {
  try {
    const environment = c.req.query("environment");

    const midtrans_client =
      environment === "sandbox"
        ? process.env.MIDTRANS_CLIENT_KEY
        : process.env.MIDTRANS_CLIENT_KEY_PRODUCTION;

    return c.json(
      {
        status: true,
        statusCode: 200,
        message: "Success get midtrans client key",
        key: midtrans_client,
      },
      { status: 200 }
    );
  } catch (error) {
    return c.json(
      {
        status: false,
        statusCode: 500,
        message: "Invalid get midtrans ke",
        key: null,
      },
      { status: 500 }
    );
  }
});

export default cardClientApp;
