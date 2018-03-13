var path = require("path");


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