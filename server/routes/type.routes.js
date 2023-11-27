const express = require("express");
const router = express.Router({ mergeParams: true });
const Type = require("../models/Type");
const isRole = require("../middleware/role.middleware");

router.delete("/:typeId", async (req, res) => {
  try {
    const { typeId } = req.params;
    const removedType = await Type.findByIdAndRemove(typeId);
    res.status(200).send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:typeId", async (req, res) => {
  try {
    const { typeId } = req.params;
    const updatedType = await Type.findByIdAndUpdate(typeId, req.body, {
      new: true,
    });
    res.send(updatedType);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

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
