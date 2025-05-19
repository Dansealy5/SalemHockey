const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const { isLoggedIn, isCoach, isAdmin } = require("../middleware/auth");

// GET all players
router.get("/", async (req, res) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single player by ID
router.get("/:id", async (req, res) => {
  try {
    const player = await prisma.player.findUnique({
      where: { id: req.params.id },
    });
    if (!player) return res.status(404).json({ error: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a new player
router.post("/", isLoggedIn, isCoach, async (req, res) => {
  try {
    const { firstName, lastName, number, position, grade, bio, photoUrl } = req.body;
    const player = await prisma.player.create({
      data: { firstName, lastName, number, position, grade, bio, photoUrl },
    });
    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH update a player
router.patch("/:id", isLoggedIn, isCoach, async (req, res) => {
  try {
    const player = await prisma.player.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a player
router.delete("/:id", isLoggedIn, isAdmin, async (req, res) => {
  try {
    await prisma.player.delete({ where: { id: req.params.id } });
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;