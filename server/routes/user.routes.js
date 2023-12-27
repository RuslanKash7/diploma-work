const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

// router.patch("/:currentUserId", async (req, res) => {
//   try {
//     const { currentUserId } = req.params;
//     const { productId } = req.body;
//     const user = await User.findById(currentUserId);
//     console.log(user);
//     if (!user) {
//       return res.status(404).json({ message: "Пользователь не найден" });
//     }

//     const existingCartItem = user.cart.find(
//       (item) => item.productId === productId
//     );

//     if (existingCartItem) {
//       existingCartItem.quantity += 1;
//     } else {
//       user.cart.push({ productId, quantity: 1 });
//     }
//     const updatedUser = await user.save();
//     console.log(updatedUser);
//     res.status(201).json(updatedUser);
//   } catch (e) {
//     res.status(500).json({
//       message: "На сервере произошла ошибка. Попробуйте позже",
//     });
//   }
// });

router.delete("/:payload", async (req, res) => {
  try {
    // const { productId, currentUserId } = req.params;
    console.log(req.body);

    console.log(req.params);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
