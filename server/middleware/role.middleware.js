const tokenService = require("../services/token.service");

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token" });
      }

      const data = tokenService.validateAccess(token);

      if (data.role !== role) {
        return res.status(403).json({ message: "Role is not permitted" });
      }

      req.user = data;

      next();
    } catch (e) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
