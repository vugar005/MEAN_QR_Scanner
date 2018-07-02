const httpsRedirect = require('express-https-redirect');
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user.routes");
const qrRoutes = require("./routes/qr.routes");
const app = express();
const mongoose = require('mongoose');
const path = require('path');
mongoose
  .connect(
    "mongodb://vugar005:Vugar4991@ds217671.mlab.com:17671/mean_qr_scanner"
  )
  .then(() => {
    console.log("Connected to database!");
    console.log("3");
  })
  .catch((er) => {
    console.log(er);
  });
// app.use("/", httpsRedirect(true));
// app.enable('trust proxy');
// app.use(function(req, res, next) {
//   if (req.secure){
//     return next();
//   }
//   res.redirect("https://" + req.headers.host + req.url);
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
 app.use("/", express.static(path.join(__dirname, "angular")));
app.use("/api/user", userRoutes);
app.use("/api/qr", qrRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "angular", "index.html"));
});
module.exports = app;
