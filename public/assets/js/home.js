
$(document).ready(function() {
  console.log(`home.js`);

  // hold our scraped headlines
  var headlinesContainer = $(".headlines-container");
  
  // Click event to save headlines
  //$(document).on("click", "button.btn-save", handleSaveHeadline);
  // Click event to scrape anew
 $(document).on("click", "button.btn-scrape", handleNewScrape);


  
  // function layoutPage() {
  //   console.log(`in layoutPage()`);

  //   headlinesContainer.empty();
  //   $.get("/"), data => {
  //     console.log(data);
  //   };
  // };

  // layoutPage();



function handleNewScrape() {
  $.get("/scrape").then(function(articles) {
    layoutPage();
  });
};


}); 