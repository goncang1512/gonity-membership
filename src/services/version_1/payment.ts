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

const paymentApp = new Hono();

paymentApp.post("/charge", async (c) => {
  const body: BodyTypePost = await c.req.json();
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
});

export default paymentApp;
