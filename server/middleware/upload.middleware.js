const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
      callback(null, true);
    } else {
      console.log("hernya");
      callback(null, false);
    }
  },
  limits: {
    fileSize: 2048 * 2048 * 2,
  },
});

module.export = upload;
