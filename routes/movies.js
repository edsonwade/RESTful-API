const express = require("express");
const router = express.Router();


//GET ROUTE
router.get("/", (req, res) => {
  res.send("hello world , how are you");
});

//GET MOVIE BY ID
router.get('/:id', (req, res) => {
    res.send(req.params.id)
})
module.exports = router;
