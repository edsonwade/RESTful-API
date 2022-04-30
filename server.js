const express = require("express");
const PORT = process.env.PORT || 3000;
const validate = require("./validate.js");

const app = express();

app.use(express.json());

const lessons = [
  { id: 1, lesson: "lesson 1" },
  { id: 2, lesson: "lesson 2" },
  { id: 3, lesson: "lesson 3" },
];

//GET ROUTE
app.get("/api/v1/lesson", (req, res) => res.send(lessons));

//GET ROUTE
app.get("/api/v1/lesson/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) res.status(404).send("The lesson ID given was not found");
  res.send(lesson);
});

//POST ROUTE
app.post("/api/v1/lesson", (req, res) => {
  const lesson = {
    id: lessons.length + 1,
    lesson: req.body.lesson,
  };
  res.send(lesson);
});

//POST ROUTE WITH INPUT VALIDATION
app.post("/api/v1/lesson", (req, res) => {
  validate(req, res);
  const lesson = {
    id: lessons.length + 1,
    lesson: req.body.lesson,
  };

  res.send(lesson);
});

//PUT ROUTE
app.put("/api/v1/lesson/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) res.status(404).send("The lesson ID given was not found");
  validate(req, res);
  lesson.lesson = req.body.lesson;
  res.send(lesson);
});

//DELETE ROUTE
app.delete("/api/v1/lesson/:id", (req, res) => {
  const lesson = lessons.find((l) => l.id === parseInt(req.params.id));
  if (!lesson) res.status(404).send("The lesson ID given was not found");
  const index = lessons.indexOf(lesson);
  lessons.splice(index, 1);

  res.send(lesson);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
