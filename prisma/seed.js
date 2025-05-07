const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Users
  const admin = await prisma.user.create({
    data: {
      name: "Coach Jake",
      email: "coach@salemhockey.com",
      password: "hashedpassword123", // hash this in production
      role: "COACH",
    },
  });

  const member = await prisma.user.create({
    data: {
      name: "Patty",
      email: "patty@parent.com",
      password: "hashedpassword123",
      role: "MEMBER",
    },
  });

  // Players
  const player1 = await prisma.player.create({
    data: {
      firstName: "Jake",
      lastName: "Miller",
      number: 12,
      position: "Forward",
      grade: 11,
      bio: "Fast skater, strong leadership.",
      photoUrl: "/images/jake.jpg",
    },
  });

  const player2 = await prisma.player.create({
    data: {
      firstName: "Bob",
      lastName: "Ross",
      number: 30,
      position: "Goalie",
      grade: 12,
      bio: "Reliable goalie with quick reflexes.",
      photoUrl: "/images/bob.jpg",
    },
  });

  // Games
  const game1 = await prisma.game.create({
    data: {
      opponent: "Novi",
      location: "Novi Ice Arena",
      date: new Date("2025-01-15T19:00:00Z"),
      isHome: false,
      result: "Win 5-3",
    },
  });

  const game2 = await prisma.game.create({
    data: {
      opponent: "Howell",
      location: "USA Hockey Arena",
      date: new Date("2025-01-22T19:00:00Z"),
      isHome: true,
    },
  });

  // Stats
  await prisma.stat.createMany({
    data: [
      {
        playerId: player1.id,
        gameId: game1.id,
        addedById: admin.id,
        goals: 2,
        assists: 1,
        penalties: 0,
      },
      {
        playerId: player2.id,
        gameId: game2.id,
        addedById: admin.id,
        goals: 0,
        assists: 0,
        penalties: 0,
      },
    ],
  });

  // Event
  await prisma.event.create({
    data: {
      title: "Team Fundraiser Night",
      description: "Join us at Salem High School to raise money for new gear.",
      date: new Date("2025-02-10T18:00:00Z"),
      location: "Salem High School",
      createdById: admin.id,
    },
  });

  // Announcement
  await prisma.announcement.create({
    data: {
      title: "Practice Rescheduled",
      content: "Wednesday practice moved to Thursday due to snowstorm.",
      createdById: admin.id,
    },
  });

  // Media
  await prisma.media.create({
    data: {
      title: "Game Highlights vs Novi",
      url: "/media/highlights-novi.mp4",
      uploadedById: admin.id,
    },
  });

  console.log("Database seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
