//controller - fetch headlines

var db = require("../models");
var scrape = require("../scripts/scrape");

// 1. scrape articles
// 2. then insert articles to db
// 3. then check for new articles
// 4. return no new OR count of new articles

module.exports = {
  scrapeHeadlines: function(req,res) {
    return scrape()
      .then( function(articles) {
        return db.Headline.create(articles);
      })
      .then( function(dbHeadline) {
        if (dbHeadline.length === 0) {
          res.json({
            message: `No New Articles Currently Available.`
          });
        }
        else {
          res.json({
            message: `Added ${dbHeadline.length} New Articles.`
          });
        }
      })
      .catch(err => {
        res.json({
          message: `Article Scrape Complete.`
        });
      });
  }
};

