

  // hold our scraped headlines
  var headlinesContainer = $(".headlines-container");
  
  // Click event to save headlines
  //$(document).on("click", "button.btn-save", handleSaveHeadline);
  // Click event to scrape anew
 $(document).on("click", "button.btn-scrape", handleNewScrape);

  layoutPage();
  
  function layoutPage() {
    headlinesContainer.empty();
    $.get("/articles").then( headlines => {
      console.log(`a headline ${headlines[3]}...anything?`);

      if (!headlines || !headlines.length) {
        displayEmpty();
        console.log("no headlines! It's empty!");
      }
      else {
        renderHeadlines(headlines);
        console.log("we have headlines - calling function initializeHeadlinesRows ");
      }
    });
  };

  function renderHeadlines(headlines) {
    var headlinesToAdd = [];
    for (var i = 0; i < headlines.length; i++) {
      headlinesToAdd.push(createHeadline(headlines[i]));
    }
    headlinesContainer.append(headlinesToAdd);
  };

  //============BUILD OUT INDIVIDUAL HEADLINE INTO .headlines-container==========

  function createHeadline(headline) {
    console.log("headline object " + headline + "...anything?");

     var newPanel =  $(
       [`
     <div class="row">
     <div class="panel panel-default">
     <div class="panel-heading">
       <h3 class="panel-title">${headline.title}</h3>
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
