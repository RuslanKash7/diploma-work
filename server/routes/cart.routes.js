const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { productId, currentUserId } = req.body;
    const user = await User.findById(currentUserId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const existingCartItem = user.cart.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      return res
        .status(404)
        .json({ message: "Товар в корзине пользователя уже существует" });
    } else {
      user.cart.push({ productId, quantity: 1 });
    }
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/", async (req, res) => {
  try {
    const { item, productId, currentUserId } = req.body;
    const user = await User.findById(currentUserId);

    if (item === "plus") {
      const existingCartItem = user.cart.find(
        (item) => item.productId === productId
      );
      existingCartItem.quantity += 1;

      user.markModified("cart"); // ЭТО самая ВАЖНАЯ вещь!!!!!!!!!

      const updatedUser = await user.save();
      res.status(201).json(updatedUser);
    }

    if (item === "minus") {
      const existingCartItem = user.cart.find(
        (item) => item.productId === productId
      );
      existingCartItem.quantity -= 1;
      if (existingCartItem.quantity < 1) {
        user.cart = user.cart.filter((item) => item.productId !== productId);
        const updatedUser = await user.save();
        res.status(201).json(updatedUser);
      } else {
        user.markModified("cart"); // ЭТО самая ВАЖНАЯ вещь!!!!!!!!!
        const updatedUser = await user.save();
        res.status(201).json(updatedUser);
      }
    }

    if (item === undefined) {
      user.cart = user.cart.filter((item) => item.productId !== productId);
      const updatedUser = await user.save();
      res.status(201).json(updatedUser);
    }
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
