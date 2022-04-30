const express = require("express");
const PORT = process.env.PORT || 3000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/movies";
const mongoose = require("mongoose");
const validate = require("./validate.js");
const app = express();

app.use(express.json());
//app.use("/movies", "moviesRouter");

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
