import prisma from "@/src/lib/prisma-client";
import { options } from "@/src/utils/options";
import axios from "axios";
import { Hono } from "hono";

const notificationApp = new Hono().post("/:status", async (c) => {
  try {
    const body = await c.req.json();

    let results = null;
    if (
      ["settlement", "capture"].includes(body.transaction_status) &&
      body.metadata.transaction_id
    ) {
      results = await axios.post(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/api/v1/membership/${body.metadata.transaction_id}`,
        {},
        options
      );

      const transaction = await prisma.transaction.update({
        where: {
          id: String(body.metadata.transaction_id),
        },
        data: {
          status: "succeeded",
          paidAt: new Date(),
        },
        select: {
          userId: true,
        },
      });

      const notification = await prisma.authorizeUri.findMany({
        where: {
          userId: transaction.userId,
        },
        select: {
          url: true,
        },
      });

      await Promise.all(
        notification.map((item) => {
          if (!item.url.startsWith("http")) {
            console.error("Invalid URL:", item.url);
            return Promise.resolve();
          }

          const { metadata, ...results } = body;

          return axios.post(item.url, results);
        })
      );
    }

    return c.json(
      {
        status: true,
        statusCode: 200,
        message: "Success send notification",
        data: results?.data,
      },
      { status: 200 }
    );
  } catch (error) {
    return c.json(
      {
        status: false,
        statusCode: 500,
        message: "Internal Server Error",
        data: null,
      },
      { status: 500 }
    );
  }
});

export default notificationApp;
