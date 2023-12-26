const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { userCart, totalSum, timePurchase, currentUserId } = req.body;
    const user = await User.findById(currentUserId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    user.purchase.push({ userCart, totalSum, timePurchase });
    user.cart = []
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
