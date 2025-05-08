const express = require("express");
const router = express.Router();
const prisma = require("../db/client");

const { isLoggedIn } = require("../middleware/auth");

//GET all users -> everyone including guests
router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET own profile —> logged-in user only
router.get("/me", isLoggedIn, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!user) return res.status(404).json({ error: "user not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//GET one user by ID -> everyone incl guests
router.get("/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user) return res.status(404).json({ error: "user not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//PUT /api/users/:id —> only that individual user or admins
router.put("/:id", isLoggedIn, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await prisma.user.update({
      where: { id: req.params.id },
      data: { name, email },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//DELETE /api/users/:id —> only that individual user or admins
router.delete("/:id", isLoggedIn, async (req, res) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "User deleted", deletedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
