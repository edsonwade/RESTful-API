const express = require("express");
const PORT = process.env.PORT || 3000;
const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/movies";
const mongoose = require("mongoose");
const validate = require("./validate.js");
const moviesRouter = require("./routes/movies.js");
const app = express();

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use("/api/v1/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
