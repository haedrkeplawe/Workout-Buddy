require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const db = "mongodb://localhost:27017/test3";
const db = process.env.DATABASE_URI;
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001","https://workout-buddy-1.netlify.app","https://workout-buddy-2.netlify.app"],
  })
);
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/user"));
app.use("/api/workouts", require("./routes/workouts"));
app.use("/api/coatch", require("./routes/coatch"));

app.all("*", (req, res) => {
  res.status(404).json("404");
});

mongoose
  .connect(db)
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
