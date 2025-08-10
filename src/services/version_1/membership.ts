import { Hono } from "hono";

type Variables = {
  admin_id: string;
};

const memberApp = new Hono<{ Variables: Variables }>().get("/", async (c) => {
  const admin_id = c.var.admin_id;

  return c.json({
    status: true,
    statusCode: 200,
    message: "Success create membership",
    data: {
      userId: admin_id,
    },
  });
});

export default memberApp;
