//scripts - scrape
var Headline = require("../models/Headline.js");
var request = require("request");
var cheerio = require("cheerio");

var scrape = function() {
  request("https://www.npr.org/sections/news/", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("article.item").each(function(i, element) {
      // Save the text and href of each link enclosed in the current element
      var title = $(element).find(".title").find("a").text();
      var link = $(element).find(".title").find("a").attr("href");
      var subtitle = $(element).find(".teaser").find("a").text();
      var imgLink = $(element).find("a").find("img").attr("src");

      // If this found element contains all data I need
      if (title && link && subtitle && imgLink) {
        // Insert the data in the Headline collection
        Headline.create({
          title: title,
          link: link,
          subtitle: subtitle,
          imgLink: imgLink
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });
};

module.exports = scrape;