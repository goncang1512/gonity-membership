"use server";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma-client";
import { generateId } from "better-auth";
import { ConfigOverlayT } from "../components/layouts/overlay/alert-overlay";
import { revalidatePath } from "next/cache";

export const getStreamOverlay = async (stream_key: string) => {
  let overlay = await prisma.overlay.findFirst({
    where: {
      id: stream_key,
    },
    select: {
      id: true,
      bgColor: true,
      highlightColor: true,
      textColor: true,
      borderless: true,
      fontWeight: true,
      fontSize: true,
      fontFamily: true,
      templateText: true,
      duration: true,
      shadow: true,
    },
  });

  return overlay;
};

export const getMyOverlay = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let overlay = await prisma.overlay.findFirst({
    where: {
      userId: String(session?.user.id),
    },
    select: {
      id: true,
      bgColor: true,
      highlightColor: true,
      textColor: true,
      borderless: true,
      fontWeight: true,
      fontSize: true,
      fontFamily: true,
      templateText: true,
      duration: true,
      shadow: true,
    },
  });

  if (!overlay) {
    overlay = await prisma.overlay.create({
      data: {
        id: generateId(32),
        userId: String(session?.user.id),
      },
      select: {
        id: true,
        bgColor: true,
        highlightColor: true,
        textColor: true,
        borderless: true,
        fontWeight: true,
        fontSize: true,
        fontFamily: true,
        templateText: true,
        duration: true,
        shadow: true,
      },
    });
  }

  return overlay;
};

export const updateAlert = async (config: ConfigOverlayT & { id: string }) => {
  const overlay = await prisma.overlay.update({
    where: {
      id: config.id,
    },
    data: {
      ...config,
    },
  });

  revalidatePath("/donation/overlay");
  return overlay;
};
