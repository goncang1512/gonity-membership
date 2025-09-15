"use client";
import React from "react";
import { Card, CardContent, CardTitle } from "../../ui/card";
import { Button, buttonVariants } from "../../ui/button";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { ablyDonation } from "@/src/lib/ably";
import { faker } from "@faker-js/faker";
import { useOverlay } from "@/src/utils/context/overlay-provider";

export default function SetUpAlert() {
  const { config } = useOverlay();
  const tesNotificaiton = () => {
    try {
      ablyDonation.publish("new-donate", {
        name: faker.person.fullName(),
        amount: "Rp20.000",
        message: faker.lorem.sentence(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card>
      <CardContent className="grid gap-2">
        <CardTitle>URL:</CardTitle>
        <h1>Klik tombol Copy dan pastekan URL di "Browser Module" OBS.</h1>
        <p>
          {" "}
          Setelah merubah tampilan, double click pada browser source pada OBS
          dan tekan "Refresh cache of current page". Jika tidak tampil, pastikan
          OBS telah terupdate ke versi terbaru (v28).
        </p>

        <p className="border-b border-black pb-2 pt-3">
          {process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/widgets/alert?streamKey=
          {config.id}
        </p>

        <div className="grid grid-cols-3 gap-2">
          <Button className="bg-blue-400 hover:bg-blue-500 cursor-pointer">
            Copy
          </Button>
          <Link
            href={`${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/widgets/alert`}
            target="_blank"
            className={cn(
              buttonVariants({
                className: "bg-amber-500 hover:bg-amber-600 cursor-pointer",
              })
            )}
          >
            Open in new tab
          </Link>
          <Button
            onClick={tesNotificaiton}
            className="bg-indigo-400 hover:bg-indigo-500 cursor-pointer"
          >
            Show notification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
