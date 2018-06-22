//controller - fetch headlines

const db = require("../models");
const scrape = require("../scripts/scrape");

// 1. scrape articles
// 2. then insert articles to db
// 3. then check for new articles
// 4. return no new OR count of new articles

module.exports = {
  scrapeHeadlines : function(req, res) {
    return scrape()
      .then(articles => {
        return db.Headline.create(articles);
      })
      .then(dbHeadline => {
        if (dbHeadline.length === 0) {
          res.json({
            message: `No new articles available`
          });
        }
        else {
          res.json({
            message: `Added ${dbHeadline.length} new articles.`
          });
        }
      })
      .catch(err => {
        res.json({
          message: `Article scrape complete.`
        });
      });
  }
};

