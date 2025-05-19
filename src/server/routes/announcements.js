const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const { isLoggedIn, isCoach } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(announcements);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", isLoggedIn, isCoach, async (req, res) => {
  try {
    const announcement = await prisma.announcement.create({
      data: {
        ...req.body,
        createdById: req.user.userId,
      },
    });
    res.status(201).json(announcement);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", isLoggedIn, isCoach, async (req, res) => {
  try {
    await prisma.announcement.delete({ where: { id: req.params.id } });
    res.json({ message: "Announcement deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;