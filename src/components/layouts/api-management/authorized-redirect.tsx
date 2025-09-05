import React from "react";
import ListUri from "./list-uri";
import { getAuthorizeURIs } from "@/src/actions/api-key.action";
import ListUriNotification from "./list-uri-notifcation";

export default async function AuthorizedRedirect() {
  const authorizeURI = await getAuthorizeURIs();

  return (
    <>
      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Authorized redirect URIs</h2>
        <p className="text-sm text-gray-500 mb-4">
          For use with requests from a web server
        </p>
        <ListUri data={authorizeURI.data?.authorize ?? []} />
      </div>

      <div className="rounded-lg border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Notification URL</h2>
        <p className="text-sm text-gray-500 mb-4">
          Set up URL will send HTTP notifications for successful, failed and
          more payment statuses.
        </p>
        <ListUriNotification data={authorizeURI.data?.notificationUri ?? []} />
      </div>
    </>
  );
}
