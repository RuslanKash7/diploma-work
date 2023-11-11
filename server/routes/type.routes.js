const express = require("express");
const router = express.Router({ mergeParams: true });
const Type = require("../models/Type");
const isRole = require("../middleware/role.middleware");

router.post("/", isRole("ADMIN"), async (req, res) => {
  try {
    const newType = await Type.create({
      ...req.body,
    });
    res.status(201).send(newType);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Type.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
