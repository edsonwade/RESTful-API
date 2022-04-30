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
/*router.get("/:id", async (req, res) => {
    try {
        const movies = await Movie.find(l => l.id === req.params.id);
        if (movies) res.json(movies)
    } catch (error) {
        res.status(404).send("The lesson ID given was not found" + error.message);
 }
});*/

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
module.exports = router;
