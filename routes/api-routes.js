
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


// Routes

module.exports = function(app) {

  app.get("/scrape", function (req, res) {
      scrape();
      res.send("Scrape complete.");
  });

// Route for getting all Headlines from the db
// app.get("/headlines", (req, res) => {
//   console.log(req.body);

//   // Grab every document in the Headlines collection
//   // If we were able to successfully find Headlines, send them back to home page
//   Headline.find({}).then(result =>  res.json(result))

//     // If an error occurred, send it to the client
//     .catch(err => {
//       res.json(err);
//     });
// });

app.get("/headlines", function (req, res) {
  Headline.find({}, function (error, data) {
      if (error) {
          console.log(error);
      } else {
        console.log(data);
        res.json(data);
      }
  });
});


};