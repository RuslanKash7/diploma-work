const express = require("express");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Basket = require("../models/Basket");
const tokenService = require("../services/token.service");
const router = express.Router({ mergeParams: true });

router.post("/signUp", [
  check("email", "Некорректная почта").isEmail(),
  check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "invalid data",
            code: 400,
          },
        });
      }

      const { email, password, role } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "User is exists",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 7);

      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
      });

      // const newBasket = await Basket.create({
      //   currentUserId: newUser._id,
      // });

      const tokens = tokenService.generate({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email некорректный").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "invalid data",
            code: 400,
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "User is not found",
            code: 400,
          },
        });
      }

      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordEqual) {
        return res.status(400).send({
          error: {
            message: "invalid password",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({
        _id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      });

      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      res.status(500).json({
        message: "На сервере произошла ошибка. Попробуйте позже",
      });
    }
  },
]);

// если рефреш токен валиден, то обновление ВСЕХ токенов

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString(); // проверка совпадают ли вообще все эти данные
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body; // переводим константу в кэмлкэйс
    const data = tokenService.validateRefresh(refreshToken); // корректен ли рефрештокен? сравнением с секретным ключём
    const dbToken = await tokenService.findToken(refreshToken); // получаем этот токен из монгодб

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorized" }); // если не авторизован
    }

    const tokens = await tokenService.generate({
      _id: data._id,
      email: data.email,
      role: data.role,
    });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
module.exports = router;
