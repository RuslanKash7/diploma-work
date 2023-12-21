const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router({ mergeParams: true });
const Basket = require("../models/Basket");

router.post("/", async (req, res) => {
  try {
    const newBasket = await Basket.create({
      ...req.body,
    });
    console.log(newBasket);
    res.status(201).send(newBasket);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const list = await Basket.find();
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:basketId", async (req, res) => {
  try {
    const { basketId } = req.params;
    const removedBasket = await Basket.findByIdAndRemove(basketId);
    res.status(200).send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:basketId", async (req, res) => {
  try {
    // const { basketId } = req.params;
    // console.log(basketId)
    const w = req.body.currentUserId;
    console.log(w);

    const q = new ObjectId(w);
    console.log(q);

    const list = await Basket.find();

    const theList = list.find((l) => l.currentUserId.equals(q));
    console.log(theList);

    // const updatedBasket = await Basket.findByIdAndUpdate(
    //   basketId,
    //   req.body,
    //   { new: true }
    // );
    // res.send(updatedBasket);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
