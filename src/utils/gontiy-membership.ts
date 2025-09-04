import axios, { AxiosInstance } from "axios";
import {
  DetailMembershipRes,
  MyMembershipRes,
  PaymentTypeRes,
} from "./types/type-gonityfy";

export type GonityFyType = {
  apiKey: string;
  environment?: string;
};

export type GonityFyRes<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

type CheckMembershipType = {
  user_id: string;
  permission: string[];
};

export class GonityFy {
  apiKey: string;
  environment?: string;
  client: AxiosInstance;

  constructor({ apiKey, environment }: GonityFyType) {
    this.apiKey = apiKey;
    this.environment = environment;

    this.client = axios.create({
      baseURL:
        !this.environment || this.environment === "production"
          ? "https://gonity-membership.vercel.app"
          : "http://localhost:3000",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`, // bisa otomatis include API Key
      },
      timeout: 60 * 1000,
      withCredentials: true,
    });

    // Interceptors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    );

    this.client.interceptors.request.use(
      (config) => {
        // contoh: bisa inject API key per-request
        config.headers.Authorization = `Bearer ${this.apiKey}`;
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  checkMembership = async ({
    user_id,
    permission,
  }: CheckMembershipType): Promise<GonityFyRes<boolean>> => {
    const result = await this.client.post(
      `/api/v1/subscribe/check/${user_id}`,
      {
        permission,
      }
    );

    return result.data;
  };

  getPaymentMethod = async (): Promise<GonityFyRes<PaymentTypeRes>> => {
    const result = await this.client.get(`/api/v1/payments/via`);

    return result.data;
  };

  getMyMembership = async (): Promise<GonityFyRes<MyMembershipRes>> => {
    const result = await this.client.get(`/api/v1/membership`);

    return result.data;
  };

  getDetailMemberhip = async ({
    membership_id,
  }: {
    membership_id: string;
  }): Promise<GonityFyRes<DetailMembershipRes | null>> => {
    const result = await this.client.get(`/api/v1/membership/${membership_id}`);

    return result.data;
  };
}

// 🔑 Tambahkan ini supaya waktu build CDN, tetap ada di window
if (typeof window !== "undefined") {
  (window as any).GonityFy = GonityFy;
}
