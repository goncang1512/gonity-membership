import React from "react";
import ListUri from "./list-uri";
import { getAuthorizeURIs } from "@/src/actions/api-key.action";

export default async function AuthorizedRedirect() {
  const authorizeURI = await getAuthorizeURIs();

  return (
    <>
      <ListUri data={authorizeURI.data ?? []} />
    </>
  );
}
