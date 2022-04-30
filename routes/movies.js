const express = require("express");
const router = express.Router();
const Movie = require("../models/movies.js");

//GET ROUTE
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//GET MOVIE BY ID
router.get("/:id", getMovie, (req, res) => {
  res.json(res.movie);
});

//POST ROUTER
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

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null)
      return res.status(404), json({ message: "cannot find movie." });
  } catch (error) {
    res.status(500), json({ message: "The ID select was not found." });
  }
  res.movie = movie;
  next();
}
module.exports = router;
