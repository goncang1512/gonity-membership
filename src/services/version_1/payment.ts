import PaymentController from "@/src/controller/payment";
import prisma from "@/src/lib/prisma-client";
import {
  BankTransferType,
  CreditCardPaymentType,
  CstoreType,
  EchannelType,
  EwalletType,
} from "@/src/utils/types/payment.types";
import { generateId } from "better-auth";
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

const paymentApp = new Hono<{ Variables: { admin_id: string } }>()
  .post("/charge", async (c) => {
    const body: BodyTypePost & BodyCreateTransaction = await c.req.json();
    try {
      const paymentCtrl = new PaymentController();

      let transaction = await prisma.transaction.findFirst({
        where: {
          memberId: body.member_id,
          tierId: body.tier_id,
        },
        select: {
          id: true,
          amount: true,
        },
      });

      if (transaction) {
        transaction = await prisma.transaction.update({
          where: {
            id: transaction.id,
          },
          data: {
            customerEmail: body.email,
            customerName: body.name,
            amount: body.amount,
            method: body.method,
            tierId: body.tier_id,
            status: "pending",
          },
          select: {
            id: true,
            amount: true,
          },
        });
      }

      if (!transaction) {
        transaction = await prisma.transaction.create({
          data: {
            id: `GPN${generateId(9).toUpperCase()}`,
            memberId: body.member_id,
            userId: c.var.admin_id,
            customerEmail: body.email,
            customerName: body.name,
            amount: body.amount,
            method: body.method,
            tierId: body.tier_id,
            status: "pending",
          },
          select: {
            id: true,
            amount: true,
          },
        });
      }

      let results = null;

      if (body.method === "bank_transfer" && body.via !== "mandiri") {
        results = await paymentCtrl.bankTransfer({
          ...body,
          amount: transaction?.amount,
          transaction_id: transaction.id,
        } as BankTransferType);
      } else if (body.method === "bank_transfer" && body.via === "mandiri") {
        results = await paymentCtrl.echannelPayment({
          ...body,
          amount: transaction?.amount,
          transaction_id: transaction.id,
        } as EchannelType);
      } else if (body.method === "cstore") {
        results = await paymentCtrl.cstorePayment({
          ...body,
          amount: transaction?.amount,
          transaction_id: transaction.id,
        } as CstoreType);
      } else if (body.method === "credit_card") {
        results = await paymentCtrl.creditCardPayment({
          ...body,
          amount: transaction?.amount,
          transaction_id: transaction.id,
        } as CreditCardPaymentType);
      } else if (body.via === "qris") {
        results = await paymentCtrl.qrisPayment({
          ...body,
          amount: transaction.amount,
          transaction_id: transaction.id,
        } as EwalletType);
      } else if (body.method === "ewallet") {
        results = await paymentCtrl.ewalletPayment({
          ...body,
          amount: transaction.amount,
          transaction_id: transaction.id,
        } as EwalletType);
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
    try {
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

      const cstore = [
        {
          id: "alfamart",
          name: "Alfamart",
          image:
            "https://i.pinimg.com/1200x/45/69/6d/45696d9f00a53c9a58818a0def16baad.jpg",
        },
        {
          id: "indomaret",
          name: "Indomaret",
          image:
            "https://i.pinimg.com/736x/29/a0/73/29a073b7a1815ef0f6b9a38f480baf9c.jpg",
        },
      ];

      const ewallet = [
        {
          id: "gopay",
          name: "GoPay",
          image:
            "https://i.pinimg.com/1200x/43/2d/a8/432da848f4a8fcaa56c55b6c8ce36807.jpg",
        },
        {
          id: "shopeepay",
          name: "ShopeePay",
          image:
            "https://i.pinimg.com/1200x/a6/cb/e6/a6cbe6a3c5e9b03ef09ebfc0969323d2.jpg",
        },
      ];

      return c.json({
        status: true,
        statusCode: 200,
        message: "Success payment method",
        data: {
          bankTransfer,
          cstore,
          ewallet,
        },
      });
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

export default paymentApp;
