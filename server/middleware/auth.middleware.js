const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  } // метод для запросов, который проверяет доступность серверов

  try {
    // Bearer kakaYaTAhren
    const token = req.headers.authorization.split(" ")[1]; // [1] - это сам токен

    if (!token) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    } // если вообще нет токена

    const data = tokenService.validateAccess(token);

    req.user = data;

    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
