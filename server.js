const express = require("express");
const cookieParser = require("cookie-parser");
const arr = require("./arrays.js");
const PORT = process.env.PORT || 3000;

const app = express();
let d = new Date(Date.UTC(2022, 04, 30));
app.get("/", (req, res) => {
  res.send({
    name: "vanilson",
    project: "Restfull api with node + express",
    date: d,
  });
});
app.get("/api/v1/arrays", (req, res) => {
  res.send(arr);
});

/* with parameters */
app.get("/api/v1/lesson/:id", (req, res) => {
  res.send(req.params.id);
});
/* Multiple params -> passing the year and name of the movie
app.get("/api/v1/lesson/:year/:title", (req, res) => {
  res.send(req.params);
});*/

/** query string params with question mark ? */
app.get("/api/v1/lesson/:year/:title", (req, res) => {
  res.send(req.query);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
