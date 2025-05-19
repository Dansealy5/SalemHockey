const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const { isLoggedIn, isCoach } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: "asc" },
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", isLoggedIn, isCoach, async (req, res) => {
  try {
    const event = await prisma.event.create({
      data: {
        ...req.body,
        createdById: req.user.userId,
      },
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", isLoggedIn, isCoach, async (req, res) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;