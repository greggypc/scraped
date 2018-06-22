const router = require("express").Router();

// route renders home page
router.get("/", (req,res) => {
  res.render("home");
});

//route render handlebars 'saved articles' page
router.get("/saved", (req,res) => {
  res.render("saved");
});

module.exports = router;