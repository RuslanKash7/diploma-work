const express = require("express");
const router = express.Router({ mergeParams: true });
const Product = require("../models/Product");
const ProductInfo = require("../models/ProductInfo");
const uuid = require("uuid");
const path = require("path");

router.post("/", async (req, res) => {
  try {
    console.log(req.body)
    let { name, price, brand, type, rating, info } = req.body;

    let { img } = req.files;
    let fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));

    console.log(req.body)

    const newProduct = await Product.create({
      name,
      price,
      brand,
      type,
      rating,
      info,
      img: fileName,
    });

    console.log(newProduct);

    if (info) {
      info = JSON.parse(info);
      info.forEach((i) =>
        ProductInfo.create({
          title: i.title,
          description: i.description,
          product_id: newProduct._id,
        })
      );
    }

    res.status(201).send(newProduct);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let { brand, type, limit, page } = req.query;

    page = page || 1; // номер страницы
    limit = limit || 9; // количество товаров на одной строке
    let offset = (page - 1) * limit; // отступ (не отрабатывает)

    let list;
    if (!brand && !type) {
      list = await Product.find().limit(parseInt(limit)).skip(offset).exec();
    }
    if (brand && !type) {
      list = await Product.find({ brand }).limit(limit).skip(offset).exec();
    }
    if (!brand && type) {
      list = await Product.find({ type }).limit(limit).skip(offset).exec();
    }
    if (brand && type) {
      list = await Product.find({
        brand,
        type,
      })
        .limit(limit)
        .skip(offset)
        .exec();
    }
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const list = await Product.findById({_id}).populate("info"); // .populate([{model: ProductInfo, as: "info"}]) ProductInfo nado kak to po drugomu
    res.status(200).send(list);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndRemove(productId);
    res.status(200).send(null);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      { new: true }
    );
    res.send(updatedProduct);
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
