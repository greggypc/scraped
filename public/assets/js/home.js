
$(document).ready(function() {
  console.log(`home.js`);

  // hold our scraped headlines
  var headlinesContainer = $(".headlines-container");
  
  // Click event to save headlines
  //$(document).on("click", "button.btn-save", handleSaveHeadline);
  // Click event to scrape anew
 $(document).on("click", "button.btn-scrape", handleNewScrape);


  
  function layoutPage() {
    console.log(`in layoutPage()`);

    headlinesContainer.empty();
    $.get("/headlines"), data => {
      console.log(data);
    
      if (!data || !data.length) {
        console.log("no headlines! It's empty!");
        displayEmpty();
      }
      else {
        renderHeadlines(data);
        console.log("we have headlines - calling function initializeHeadlinesRows ");
      }
    };
  };

  function renderHeadlines(headlines) {
    console.log("we have headlines? " + headlines);

    var headlinesToAdd = [];
    for (var i = 0; i < headlines.length; i++) {
      headlinesToAdd.push(createHeadline(headlines[i]));
    }
    headlinesContainer.append(headlinesToAdd);
  };

  layoutPage();

  //============BUILD OUT INDIVIDUAL HEADLINE INTO .headlines-container==========

  function createHeadline(headline) {
    console.log("headline object " + headline + "...anything?");

     var newPanel =  $(
       [`
     <div class="row">
     <div class="panel panel-default">
     <div class="panel-heading">
     <h3 class="panel-title"><a href="${headline.link}">${headline.title}</a></h3>
     <button type="button" class="btn btn-success btn-save" id="${headline._id}>Save Article</button>
     </div>
     <div class="panel-body">
       ${headline.summary}
     </div>
   </div>
      `]); 

      return newPanel;
  };

function handleNewScrape() {
  $.get("/scrape").then(function(articles) {
    layoutPage();
  });
};


}); 