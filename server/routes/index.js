const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/brand", require("./brand.routes"));
router.use("/basket", require("./basket.routes"));
router.use("/product", require("./product.routes"));
router.use("/type", require("./type.routes"));

module.exports = router;
