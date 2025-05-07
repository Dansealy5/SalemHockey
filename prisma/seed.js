import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function main() {
  const defaultPassword = "password123";
  const hashedPassword = await hashPassword(defaultPassword);

  // Create a coach
  const coach = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email: "coach@salemhockey.com",
      password: hashedPassword,
      role: "COACH",
    },
  });

  // Create members
  const members = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: hashedPassword,
          role: "MEMBER",
        },
      })
    )
  );

  // Create players
  const players = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.player.create({
        data: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          number: faker.number.int({ min: 1, max: 99 }),
          position: faker.helpers.arrayElement(["Forward", "Defense", "Goalie"]),
          grade: faker.number.int({ min: 9, max: 12 }),
          bio: faker.lorem.sentence(),
          photoUrl: faker.image.avatar(),
        },
      })
    )
  );

  // Create games
  const games = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.game.create({
        data: {
          opponent: `${faker.location.city()} High`,
          location: faker.location.streetAddress(),
          date: faker.date.future(),
          isHome: faker.datatype.boolean(),
          result: faker.helpers.maybe(() => `Win ${faker.number.int({ min: 1, max: 5 })}-${faker.number.int({ min: 0, max: 4 })}`),
        },
      })
    )
  );

  // Create stats
  await Promise.all(
    players.slice(0, 5).map((player) =>
      prisma.stat.create({
        data: {
          playerId: player.id,
          gameId: faker.helpers.arrayElement(games).id,
          addedById: coach.id,
          goals: faker.number.int({ min: 0, max: 3 }),
          assists: faker.number.int({ min: 0, max: 2 }),
          penalties: faker.number.int({ min: 0, max: 2 }),
        },
      })
    )
  );

  // Create event
  await prisma.event.create({
    data: {
      title: faker.company.catchPhrase(),
      description: faker.lorem.paragraph(),
      date: faker.date.future(),
      location: faker.location.secondaryAddress(),
      createdById: coach.id,
    },
  });

  // Create announcement
  await prisma.announcement.create({
    data: {
      title: "Practice Update",
      content: faker.lorem.sentences(2),
      createdById: coach.id,
    },
  });

  // Create media
  await prisma.media.create({
    data: {
      title: "Season Kickoff Video",
      url: faker.internet.url(),
      uploadedById: coach.id,
    },
  });

  console.log("Database seeded");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });
