//scripts - scrape
const axios = require("axios");
const cheerio = require("cheerio");

const scrape = function() {
  // scrape NPR site
  return axios.get("https://www.npr.org/sections/news/")
    .then(res => {
      const $ = cheerio.load(res.data);
      // empty array to hold article data
      const articles = [];
    
    // For each element article.item
    $("article.item").each((i, element) => {
      // Save data of each link enclosed in the current element
      let title = $(element).find(".title").find("a").text().trim();
      let url = $(element).find(".title").find("a").attr("href");
      let summary = $(element).find(".teaser").find("a").text().trim();
      let imgUrl = $(element).find("a").find("img").attr("src");

      // If this found element contains all data I need
      if (title && url && summary && imgUrl) {

        //make tidy. Remove extra lines/spaces
        let titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        let summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Insert the data in the Headline collection
        let dataToAdd = {
          title: titleNeat,
          url: url,
          summary: summaryNeat,
          imgUrl: imgUrl
        };
       
        // push each article data into 'articles' array
        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

module.exports = scrape;