//scripts - scrape

var axios = require("axios");
var cheerio = require("cheerio");

var scrape = function() {
 return axios.get("http://www.echojs.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

  var articles = [];

  // Now, we grab every h2 within an Headline tag, and do the following:
  $("article h2").each(function(i, element) {
    // Save an empty result object
    var result = {};

    // Add the text and href of every link, and save them as properties of the result object
    result.title = $(this)
      .children("a")
      .text();
    result.link = $(this)
      .children("a")
      .attr("href");
  
  });
 });
};

module.exports = scrape;