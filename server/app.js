const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const routes = require("./routes");
const path = require("path")

const app = express();

app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static"))); // отображение папки со статикой (изображения)
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(fileUpload({}));
app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");
}

async function start() {
  try {
    // mongoose.connection.once("open", () => {
    //   initDatabase();
    // });
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`MongoDB connected.`));
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    );
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1); // выход из программы вообще
  }
}

start();
