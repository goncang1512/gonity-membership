import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { generateId } from "better-auth";
import { addDays } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 20; i++) {
    const tierId = [
      "TZ8ZHS0Xd5IAy3yRy2R3S7CET8l1Dy87",
      "1e7q3Ps1J4FvMJBQJDFzkV3WvaK1oKd0",
      "Oh5r1djrfCWvg1seEduSBaoYtEGJMvlI",
      "ExrTLiGfZ8IcMJiHr7NWVBp198in1nJL",
    ];

    const randomTierId = tierId[Math.floor(Math.random() * tierId.length)];

    const membership = await prisma.membership.findFirst({
      where: {
        id: randomTierId,
      },
    });

    await prisma.subscribe.create({
      data: {
        id: generateId(32),
        memberId: generateId(32),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        expiredAt: addDays(new Date(), membership.duration),
        status: "active",
        userId: membership?.userId,
        membershipId: membership.id,
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seeding complete!");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
