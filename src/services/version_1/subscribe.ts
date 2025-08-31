import { checkSubscriptionMembership } from "@/src/middleware/check-subscribe";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import AppError from "@/src/utils/app-error";

const subscribeApp = new Hono().post(
  "/check/:user_id",
  zValidator("json", z.object({ permission: z.array(z.string()) })),
  async (c) => {
    try {
      const user_id = c.req.param("user_id");
      const body = await c.req.json();

      const checked = await checkSubscriptionMembership(
        user_id,
        body.permission
      );

      return c.json({
        status: true,
        statusCode: 200,
        message: "Success check subscribe",
        data: checked,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return c.json(
          {
            status: false,
            statusCode: error.statusCode,
            message: error.message,
            data: null,
          },
          { status: 500 }
        );
      }

      return c.json(
        {
          status: false,
          statusCode: 500,
          message: "Internal server error",
          data: null,
        },
        { status: 500 }
      );
    }
  }
);

export default subscribeApp;
