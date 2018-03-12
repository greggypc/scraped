
  // hold our scraped headlines
  var articlesContainer = $(".articles-container");
  
  // Click event to save headlines
  $(document).on("click", "button.btn-save", handleSaveArticle);
  // Click event to scrape anew
  $(document).on("click", "button.btn-scrape", handleNewScrape);

