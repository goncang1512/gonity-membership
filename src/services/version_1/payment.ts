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
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/bca_va.png`,
        },
        {
          id: "bni",
          name: "BNI",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/bni_va.png`,
        },
        {
          id: "bri",
          name: "BRI",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/bri_va.png`,
        },
        {
          id: "bsi",
          name: "BSI",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/bsi_va.svg`,
        },
        {
          id: "mandiri",
          name: "Mandiri",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/mandiri_bill.png`,
        },
        {
          id: "permata",
          name: "Permata",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/permata_va.svg`,
        },
        {
          id: "cimb",
          name: "CIMB NIAGA",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/cimb_va.png`,
        },
        {
          id: "danamon",
          name: "Danamon",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/danamon_va.svg`,
        },
        {
          id: "seabank",
          name: "SeaBank",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/seabank_va.svg`,
        },
      ];

      const cstore = [
        {
          id: "alfamart",
          name: "Alfamart",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/alfamart.png`,
        },
        {
          id: "indomaret",
          name: "Indomaret",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/indomaret.png`,
        },
      ];

      const ewallet = [
        {
          id: "gopay",
          name: "GoPay",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/gopay.png`,
        },
        {
          id: "shopeepay",
          name: "ShopeePay",
          image: `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/methods/shopeepay.png`,
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
