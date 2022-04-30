const express = require("express");
const cookieParser = require("cookie-parser");
const arr = require("./arrays.js");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

const lessons = [
  { id: 1, lesson: "lesson 1" },
  { id: 2, lesson: "lesson 2" },
  { id: 3, lesson: "lesson 3" },
];
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

/*  return all lessons */
app.get("/api/v1/lesson", (req, res) => {
  res.send(lessons);
});

/* get the lesson by specific id  . req.params return a string reason why the parse */
app.get("/api/v1/lesson/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) {
    res.status(404).send("The lesson ID given was not found");
  }
  res.send(lesson);
});

/* passing parameters */
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

app.post("/api/v1/lessons", (req, res) => {
  const lesson = {
    id: lessons.length + 1,
    lesson: req.body.lesson,
  };
  res.send(lesson);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
