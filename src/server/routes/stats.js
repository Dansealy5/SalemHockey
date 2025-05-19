const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const { isLoggedIn } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const stats = await prisma.stat.findMany({
      include: { player: true, game: true, addedBy: true },
    });
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const stat = await prisma.stat.findUnique({
      where: { id: req.params.id },
      include: { player: true, game: true },
    });
    res.json(stat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", isLoggedIn, async (req, res) => {
  try {
    const { playerId, gameId, goals, assists, penalties } = req.body;
    const stat = await prisma.stat.create({
      data: {
        playerId,
        gameId,
        goals,
        assists,
        penalties,
        addedById: req.user.userId,
      },
    });
    res.status(201).json(stat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id", isLoggedIn, async (req, res) => {
  try {
    const stat = await prisma.stat.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(stat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    await prisma.stat.delete({ where: { id: req.params.id } });
    res.json({ message: "Stat deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;