export type BankTransferType = {
  via: "bca" | "bni" | "bri" | "permata" | "cimb";
  amount: number;
  full_name: string;
  email: string;
  transaction_id: string;
};

export interface PaymentResponse {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id?: string;
  gross_amount: string;
  currency: string;
  payment_type: "bank_transfer" | "echannel";
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  expiry_time?: string;
  metadata?: any;

  // konsistensi untuk VA
  va_numbers:
    | {
        bank: string;
        va_number: string;
      }[]
    | {
        bank: string;
        bill_key: string;
        biller_code: string;
      }[]
    | {
        store: string;
        payment_code: string;
      }[];
}

export type CreditCardPaymentType = {
  token_card: string;
  amount: number;
  full_name: string;
  email: string;
  transaction_id: string;
};

export type EchannelType = {
  amount: number;
  full_name: string;
  email: string;
  transaction_id: string;
};

export type CstoreType = {
  via: "alfamart" | "indomaret";
  amount: number;
  full_name: string;
  email: string;
  transaction_id: string;
};

export type EwalletType = {
  via: "gopay" | "shoppepay" | "qris";
  amount: number;
  full_name: string;
  email: string;
  transaction_id: string;
};
