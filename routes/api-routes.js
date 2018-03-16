
// Required
var express = require("express");
var Headline = require("../models/Headline.js");
// Our scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Scrape script
var scrape = require("../scripts/scrape.js");
// Models
var model = require("../models");


// Routes

module.exports = function(app) {

  app.get("/scrape", function (req, res) {
      scrape();
      res.send("Scrape complete.");
  });

// Route for getting all Headlines from the db
app.get("/articles", (req, res) => {
  // Grab every document in the Articles collection
  // If we were able to successfully find Headlines, send them back to home page
  Headline.find({saved: false}).then(result =>  res.json(result))
     
    // If an error occurred, send it to the client
    .catch(err => {
      res.json(err);
    });
});

};