const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const qrRoutes = require("./routes/qr.routes");
const server = express();
const mongoose = require('mongoose');
mongoose
  .connect(
    "mongodb://vugar005:Vugar4991@ds217671.mlab.com:17671/mean_qr_scanner"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((er) => {
    console.log(er);
  });
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cors());

server.use("/api/user", userRoutes);
server.use("/api/qr", qrRoutes);


module.exports = server;
