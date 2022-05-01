const express = require("express");
const router = express.Router();
const Movie = require("../models/movies.js");

//GET ROUTE - FIND ALL MOVIES
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET MOVIES BY ID
router.get("/:id", getMovie, (req, res) => {
  res.json(res.movie);
});

//POST ROUTER - CREATE A NEW MOVIE
router.post("/", async (req, res) => {
  const movie = new Movie({
    movieDirector: req.body.movieDirector,
    movieTitle: req.body.movieTitle,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/update/:id", getMovie, async (req, res) => {
  if (req.body.movieTitle != null) {
    res.movie.movieTitle = req.body.movieTitle;
  }
  if (req.body.movieDirector != null) {
    res.movie.movieDirector = req.body.movieDirector;
  }
  try {
    const updateMovie = await res.movie.save();
    res.json(updateMovie);
  } catch (error) {
    res.status(400).json({ message: " movie not update" });
  }
});

router.delete("/delete/:id", getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "deleted movie" });
  } catch (error) {
    res.status(500).json({ message: "could not find movie." });
  }
});

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null)
      return res.status(404), json({ message: "cannot find movie." });
  } catch (error) {
    res.status(500).json({ message: "The ID select was not found." });
  }
  res.movie = movie;
  next();
}
module.exports = router;
