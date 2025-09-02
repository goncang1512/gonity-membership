export type PaymentTypeRes = {
  bankTransfer: {
    id: string;
    name: string;
    image: string;
  }[];
  cstore: {
    id: string;
    name: string;
    image: string;
  }[];
  ewallet: {
    id: string;
    name: string;
    image: string;
  }[];
};

export type MyMembershipRes = {
  status: "active" | "inactive" | "pending";
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration: number;
  badge: string;
  createdAt: string;
  permissions: {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
  }[];
}[];

export type DetailMembershipRes = {
  id: string;
  name: string;
  price: number;
  duration: number;
  permissions: {
    id: string;
    name: string;
  }[];
};
