const express = require("express");
const router = express.Router();
const prisma = require("../db/client");
const { isLoggedIn } = require("../middleware/auth");

router.get("/", isLoggedIn, async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/read", isLoggedIn, async (req, res) => {
  try {
    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { read: true },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    await prisma.notification.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;