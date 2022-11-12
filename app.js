const express = require("express");
const dotenv = require("dotenv");

const app = express();

// app.get("/", (req, res) => {
//   res.send("youseop");
// });

// app.get("/objects", (req, res) => {
//   res.send("objects");
// });

const connectDB = require("./config/db");

//Load Config
dotenv.config({ path: "./config/config.env" });
connectDB();

app.listen(8080);
