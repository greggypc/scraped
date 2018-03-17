
// Required
var express = require("express");

// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Scrape script
var scrape = require("../scripts/scrape.js");
// Models
var Headline = require("../models/Headline.js");
var Note = require("../models/Note.js");
//var bodyParser = require("body-parser");

// Routes

module.exports = function(app) {

  app.get("/scrape", function (req, res) {
      scrape();
      res.send("Scrape complete.");
  });

// Route for getting all Headlines to DOM index
  app.get('/', (req,res) => {
  Headline
    .find({})
    .then(headlines => res.render('index', {headlines}))
    .catch(err=> res.json(err));
});



};