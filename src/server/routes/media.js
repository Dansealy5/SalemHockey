const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const { isLoggedIn, isCoach } = require("../middleware/auth");

router.get("/", async (req, res) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", isLoggedIn, isCoach, async (req, res) => {
  try {
    const media = await prisma.media.create({
      data: {
        ...req.body,
        uploadedById: req.user.userId,
      },
    });
    res.status(201).json(media);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", isLoggedIn, isCoach, async (req, res) => {
  try {
    await prisma.media.delete({ where: { id: req.params.id } });
    res.json({ message: "Media deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;