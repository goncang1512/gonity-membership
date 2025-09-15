import { PrismaClient } from "@prisma/client";
import { generateId } from "better-auth";

const prisma = new PrismaClient();

const main = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
      },
    });

    for (const user of users) {
      // cek apakah overlay sudah ada
      const existing = await prisma.overlay.findUnique({
        where: {
          userId: user.id, // pastikan di model overlay ada unique constraint untuk userId
        },
      });

      if (!existing) {
        // kalau belum ada → buat overlay default
        await prisma.overlay.create({
          data: {
            id: generateId(32),
            userId: user.id,
          },
        });
        console.log(`Overlay dibuat untuk userId: ${user.id}`);
      } else {
        console.log(`Overlay sudah ada untuk userId: ${user.id}, skip.`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

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
