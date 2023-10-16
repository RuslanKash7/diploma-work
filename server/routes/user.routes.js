const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/User")

router.post("/registration", async (req, res)=>{});

router.post("/login", async (req, res)=>{});

router.get("/", async (req, res) => {
    try {
      const list = await User.find();
      res.status(200).send(list);
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  });

module.exports= router