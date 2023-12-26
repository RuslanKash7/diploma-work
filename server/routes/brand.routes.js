const express = require("express");
const router = express.Router({ mergeParams: true });
const Brand = require("../models/Brand");

router.delete("/:brandId", async (req, res) => {
  try {
    const { brandId } = req.params;
    await Brand.findByIdAndRemove(brandId);
    res.status(200).send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:brandId", async (req, res) => {
  try {
    const { brandId } = req.params;
    const updatedBrand = await Brand.findByIdAndUpdate(brandId, req.body, {
      new: true,
    });
    res.send(updatedBrand);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newBrand = await Brand.create({
      ...req.body,
    });
    res.status(201).send(newBrand);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Brand.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
