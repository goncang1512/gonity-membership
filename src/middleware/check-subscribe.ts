import prisma from "../lib/prisma-client";

export const checkSubscriptionMembership = async (
  user_id: string,
  permission: string[]
) => {
  try {
    const membership = await prisma.subscribe.findFirst({
      where: {
        userId: user_id,
      },
      select: {
        membership: {
          select: {
            permissions: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const permissionCheck = membership?.membership.permissions.map(
      (data) => data.name
    );

    return permission.some((item) => permissionCheck?.includes(item));
  } catch (error) {
    return false;
  }
};
