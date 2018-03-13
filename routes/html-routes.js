var path = require("path");

// var router = require("express").Router();

// // This route renders the homepage
// router.get("/", function(req, res) {
//  res.render("index");
// });

// // This route renders the saved handledbars page
// router.get("/saved", function(req, res) {
//  res.render("saved");
// });

// module.exports = router;
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  
  app.get("/", function(req, res) {
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });

  app.get("/saved", function(req, res) {
    res.render(path.join(__dirname, "../views/saved.handlebars"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });
};