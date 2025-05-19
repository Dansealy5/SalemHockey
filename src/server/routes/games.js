const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const { isLoggedIn, isCoach } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      orderBy: { date: "desc" },
      include: { stats: true },
    });
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const game = await prisma.game.findUnique({
      where: { id: req.params.id },
      include: { stats: true },
    });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", isLoggedIn, isCoach, async (req, res) => {
  try {
    const game = await prisma.game.create({ data: req.body });
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", isLoggedIn, isCoach, async (req, res) => {
  try {
    const game = await prisma.game.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", isLoggedIn, isCoach, async (req, res) => {
  try {
    await prisma.game.delete({ where: { id: req.params.id } });
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;