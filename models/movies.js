const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieDirector: {
    type: String,
    required: true,
  },
  movieTitle: {
    type: String,
    required: true,
  },
  movieDate: {
    type: Date,
    required: true,
    default: Date.UTC(2022, 04, 30),
  },
});

module.exports = mongoose.model("Movie", movieSchema);
