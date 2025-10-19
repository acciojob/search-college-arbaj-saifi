const express = require("express");
const app = express();
const { collegeModel } = require("./connector");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

// solution starts

// solution end

module.exports = { app };
