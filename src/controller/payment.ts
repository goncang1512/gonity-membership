import { generateId } from "better-auth";
import coreApi from "../lib/midtrans";
import {
  PaymentResponse,
  BankTransferType,
  CreditCardPaymentType,
  CstoreType,
  EchannelType,
  EwalletType,
} from "../utils/types/payment.types";

class PaymentController {
  bankTransfer = async (body: BankTransferType): Promise<PaymentResponse> => {
    const payment = await coreApi.charge({
      payment_type: "bank_transfer",
      bank_transfer: { bank: body.via },
      transaction_details: {
        order_id: `GPN${generateId(9).toUpperCase()}`,
        gross_amount: body.amount,
      },
      customer_details: {
        first_name: body.full_name,
        email: body.email,
      },
      metadata: {
        transaction_id: body.transaction_id,
      },
    });

    // --- 🔹 Normalisasi supaya konsisten ---
    let va_numbers: { bank: string; va_number: string }[] = [];

    if (payment.permata_va_number) {
      va_numbers.push({
        bank: "permata",
        va_number: payment.permata_va_number,
      });
    }

    if (payment.va_numbers) {
      va_numbers = payment.va_numbers;
    }

    const normalized: PaymentResponse = {
      status_code: payment.status_code,
      status_message: payment.status_message,
      transaction_id: payment.transaction_id,
      order_id: payment.order_id,
      merchant_id: payment.merchant_id,
      gross_amount: payment.gross_amount,
      currency: payment.currency,
      payment_type: payment.payment_type,
      transaction_time: payment.transaction_time,
      transaction_status: payment.transaction_status,
      fraud_status: payment.fraud_status,
      expiry_time: payment.expiry_time,
      metadata: payment.metadata,
      va_numbers,
    };

    return normalized;
  };

  echannelPayment = async (body: EchannelType): Promise<PaymentResponse> => {
    const payment = await coreApi.charge({
      payment_type: "echannel",
      transaction_details: {
        order_id: `GPN${generateId(9).toUpperCase()}`,
        gross_amount: body.amount,
      },
      echannel: {
        bill_info1: "Payment transaction",
        bill_info2: "Membership order",
      },
      customer_details: {
        first_name: body.full_name,
        email: body.email,
      },
      metadata: {
        transaction_id: body.transaction_id,
      },
    });

    let va_numbers: { bank: string; bill_key: string; biller_code: string }[] =
      [];

    if (payment.bill_key) {
      va_numbers.push({
        bank: "mandiri",
        bill_key: payment.bill_key,
        biller_code: payment.biller_code,
      });
    }

    const normalized: PaymentResponse = {
      status_code: payment.status_code,
      status_message: payment.status_message,
      transaction_id: payment.transaction_id,
      order_id: payment.order_id,
      merchant_id: payment.merchant_id,
      gross_amount: payment.gross_amount,
      currency: payment.currency,
      payment_type: payment.payment_type,
      transaction_time: payment.transaction_time,
      transaction_status: payment.transaction_status,
      fraud_status: payment.fraud_status,
      expiry_time: payment.expiry_time,
      metadata: payment.metadata,
      va_numbers,
    };

    return normalized;
  };

  cstorePayment = async (body: CstoreType): Promise<PaymentResponse> => {
    const payment = await coreApi.charge({
      payment_type: "cstore",
      transaction_details: {
        order_id: `GPN${generateId(9).toUpperCase()}`,
        gross_amount: body.amount,
      },
      customer_details: {
        first_name: body.full_name,
        email: body.email,
      },
      cstore: {
        store: body.via,
        message: "Payment membership",
        alfamart_free_text_1: "1st row of receipt,",
        alfamart_free_text_2: "This is the 2nd row,",
        alfamart_free_text_3: "3rd row. The end.",
      },
      metadata: {
        transaction_id: body.transaction_id,
      },
    });

    let va_numbers: { store: string; payment_code: string }[] = [];

    if (payment.payment_code) {
      va_numbers.push({
        store: payment.store,
        payment_code: payment.payment_code,
      });
    }

    const normalized: PaymentResponse = {
      status_code: payment.status_code,
      status_message: payment.status_message,
      transaction_id: payment.transaction_id,
      order_id: payment.order_id,
      merchant_id: payment.merchant_id,
      gross_amount: payment.gross_amount,
      currency: payment.currency,
      payment_type: payment.payment_type,
      transaction_time: payment.transaction_time,
      transaction_status: payment.transaction_status,
      fraud_status: payment.fraud_status,
      expiry_time: payment.expiry_time,
      metadata: payment.metadata,
      va_numbers,
    };

    return normalized;
  };

  creditCardPayment = async (body: CreditCardPaymentType) => {
    const payment = await coreApi.charge({
      payment_type: "credit_card",
      transaction_details: {
        order_id: `GPN${generateId(9).toUpperCase()}`,
        gross_amount: body.amount,
      },
      credit_card: {
        token_id: body.token_card,
        authentication: true,
      },
      customer_details: {
        first_name: body.full_name,
        email: body.email,
      },
      metadata: {
        transaction_id: body.transaction_id,
      },
    });

    return payment;
  };

  ewalletPayment = async (body: EwalletType) => {
    const payment = await coreApi.charge({
      payment_type: body.via,
      transaction_details: {
        order_id: `GPN${generateId(9).toUpperCase()}`,
        gross_amount: body.amount,
      },
      customer_details: {
        first_name: body.full_name,
        email: body.email,
      },
      metadata: {
        transaction_id: body.transaction_id,
      },
    });

    return payment;
  };

  qrisPayment = async (body: EwalletType) => {
    const payment = await coreApi.charge({
      payment_type: "qris",
      transaction_details: {
        order_id: `GPN${generateId(9).toUpperCase()}`,
        gross_amount: body.amount,
      },
      customer_details: {
        first_name: body.full_name,
        email: body.email,
      },
      qris: {
        acquirer: "gopay",
      },
      metadata: {
        transaction_id: body.transaction_id,
      },
    });

    return payment;
  };
}

export default PaymentController;
