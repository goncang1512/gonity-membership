import PaymentController from "@/src/controller/payment";
import prisma from "@/src/lib/prisma-client";
import {
  BankTransferType,
  CreditCardPaymentType,
  CstoreType,
  EchannelType,
} from "@/src/utils/types/payment.types";
import { Hono } from "hono";

type BodyTypePost = {
  transaction_id: string;
  method: string;
  via: string;
  full_name: string;
  email: string;
  token_card: string;
};

type BodyCreateTransaction = {
  name: string;
  email: string;
  member_id: string;
  amount: number;
  method: string;
  tier_id: string;
};

const paymentApp = new Hono()
  .post("/charge", async (c) => {
    const body: BodyTypePost & BodyCreateTransaction = await c.req.json();
    try {
      const paymentCtrl = new PaymentController();

      const transaction = await prisma.transaction.findFirst({
        where: {
          id: body.transaction_id,
        },
        select: {
          id: true,
          amount: true,
        },
      });

      let results = null;

      if (body.method === "bank_transfer" && body.via !== "mandiri") {
        results = await paymentCtrl.bankTransfer({
          ...body,
          amount: transaction?.amount,
        } as BankTransferType);
      } else if (body.method === "bank_transfer" && body.via === "mandiri") {
        results = await paymentCtrl.echannelPayment({
          ...body,
          amount: transaction?.amount,
        } as EchannelType);
      } else if (body.method === "cstore") {
        results = await paymentCtrl.cstorePayment({
          ...body,
          amount: transaction?.amount,
        } as CstoreType);
      } else if (body.method === "credit_card") {
        results = await paymentCtrl.creditCardPayment({
          ...body,
          amount: transaction?.amount,
        } as CreditCardPaymentType);
      } else {
        throw new Error("Invalid error");
      }

      return c.json(
        {
          status: true,
          statusCode: results.status_code,
          message: "Success payment membership",
          data: results,
        },
        { status: results.status_code }
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
  })
  .get("/via", async (c) => {
    const bankTransfer = [
      {
        id: "bca",
        name: "BCA",
        image:
          "https://i.pinimg.com/736x/00/cb/4f/00cb4f7ad2d81f39afffe610fc1d07fd.jpg",
      },
      {
        id: "bni",
        name: "BNI",
        image:
          "https://i.pinimg.com/736x/47/3c/64/473c64ed9af3edc9631979ec39e58934.jpg",
      },
      {
        id: "bri",
        name: "BRI",
        image:
          "https://i.pinimg.com/736x/f8/89/3c/f8893c524e737a00d7aabc02a1737ce9.jpg",
      },
      {
        id: "bsi",
        name: "BSI",
        image:
          "https://i.pinimg.com/1200x/57/6b/12/576b12390f3f70f03474268552d12103.jpg",
      },
      {
        id: "mandiri",
        name: "Mandiri",
        image:
          "https://i.pinimg.com/736x/1b/1e/ae/1b1eae66e95098ca6c3b34a2080e0c5e.jpg",
      },
      {
        id: "permata",
        name: "Permata",
        image:
          "https://i.pinimg.com/1200x/76/73/d2/7673d2bfe339774be8f679443feca1b3.jpg",
      },
      {
        id: "cimb",
        name: "CIMB NIAGA",
        image:
          "https://i.pinimg.com/736x/04/4b/63/044b63ce7c415fef4346852325d6c557.jpg",
      },
    ];

    return c.json({
      status: true,
      statusCode: 200,
      message: "Success payment method",
      data: {
        bankTransfer,
      },
    });
  });

export default paymentApp;
