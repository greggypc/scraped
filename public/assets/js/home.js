

  // hold our scraped headlines
  var articlesContainer = $(".articles-container");
  
  // Click event to save headlines
  $(document).on("click", "button.btn-save", handleSaveArticle);
  // Click event to scrape anew
  $(document).on("click", "button.btn-scrape", handleNewScrape);


  handleNewScrape() {
    // Grab the articles as a json
$.get("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $(".articles-container").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
  }
});
  }