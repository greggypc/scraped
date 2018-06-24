
$(document).ready(function() {
  console.log(`index.js`);

  // hold our scraped headlines
  var articleContainer = $(".article-container");
  
  // Click event listener to save headlines
  //$(document).on("click", "button.btn-save", handleSaveHeadline);
  // Click event listener to scrape fresh articles
 $(document).on("click", "button.btn-scrape", handleNewScrape);


  
  initPage = () => {
    console.log(`in initPage()`);

    // empty article container/run AJAX request for unsaved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(data => {
      // if w ehave articles, render to DOM
      console.log(data);
      if (data && data.length) {
        renderArticles(data);
      }else {
        // render message 'no articles!'
        renderEmpty();
      }
    });
  };

  initPage();




handleNewScrape = () => {
  $.get("/api/fetch").then(data => {
    initPage();
    bootbox.alert(`<h3 class='text-center m-top-80'>${ data.message }</h3>`)
  });
};


}); 