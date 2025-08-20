import { MidtransClient } from "midtrans-node-client";

const coreApi = new MidtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export default coreApi;
