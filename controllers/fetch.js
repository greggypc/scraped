//controller - fetch - 

//  var Headline = require("./models/Headline.js");
//  var scrape = require("./scripts/scrape");

// module.exports = {
//   scrapeArticles: function(req, res) {
//     // scrape the NYT
//     return scrape()
//       .then(function(articles) {
//         // then insert articles into the db
//         return Headline.create(articles);
//       })
//       .then(function(Headline) {
//         if (Headlinee.length === 0) {
//           res.json({
//             message: "No new articles today. Check back tomorrow!"
//           });
//         }
//         else {
//           // Otherwise send back a count of how many new articles we got
//           res.json({
//             message: "Added " + Headline.length + " new articles!"
//           });
//         }
//       })
//       .catch(function(err) {
//         // This query won't insert articles with duplicate headlines, but it will error after inserting the others
//         res.json({
//           message: "Scrape complete!!"
//         });
//       });
//   }
//  };