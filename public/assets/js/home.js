

  // hold our scraped headlines
  var articlesContainer = $(".articles-container");
  
  // Click event to save headlines
  $(document).on("click", "button.btn-save", handleSaveArticle);
  // Click event to scrape anew
  $(document).on("click", "button.btn-scrape", handleNewScrape);


  layoutPage();
  
  // function layoutPage() {
  //   articlesContainer.empty();
  //   $.get("/api/articles?saved=false").then( function(articles) {
  //     if (!articles || !articles.length) {
  //       displayEmpty();
  //     }
  //     else {
  //       initializeArticlesRows(articles);
  //     }
  //   });
  // }

  function initializeArticlesRows() {
    var articlesToAdd = [];
    for (var i = 0; i < articles.length; i++) {
      articlesToAdd.push(createNewArticleRow(articles[i]));
    }
    articlesContainer.append(articlesToAdd);
  }

  //============BUILD OUT INDIVIDUAL ARTICLES INTO .articles-container==========

  function createNewArticleRow(articles) {
    console.log("article object " , articles);

     var $newArticleRow =  $('.articles-container').append(`
     <div class="row">
     <div class="panel panel-default">
     <div class="panel-heading">
       <h3 class="panel-title">${article.title}</h3>
       <button type="button" class="btn btn-success btn-save">Save Article</button>
     </div>
     <div class="panel-body">
       ${article.summary}
     </div>
   </div>
      `); 

      newArticleRow.data("_id", article._id);

      return $newArticleRow;
  };

// function handleNewScrape() {
//   $.get("/api/fetch").then(function(articles) {
//     layoutPage();
//   });
// };
