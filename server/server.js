const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Database Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful.");
  })
  .catch((err) => {
    console.log("Databse connection unsuccesful", err);
  });

//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Route Middleware
fs.readdirSync("./routes").map((r) => {
  app.use("/api", require(`./routes/${r}`));
});

const port = process.env.port;

app.listen(port, () => {
  console.log("Server started.", port);
});
