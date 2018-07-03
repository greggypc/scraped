
$(document).ready( () => {
  // hold our scraped headlines
  const articleContainer = $(".article-container");
  
  // Click event listener to save headlines
  $(document).on("click", ".btn-save", handleArticleSave);
  // Click event listener to scrape fresh articles
  $(document).on("click", ".btn-scrape", handleArticleScrape);
  $(document).on("click", ".scrape-new", handleArticleScrape);

  // layout page
  initPage();
  
  function initPage() {
    // empty article container/run AJAX request for unsaved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=false").then(data => {
      // if we have articles, render to DOM
      console.log(data);

      if (data && data.length) {
        renderArticles(data);
      }else {
        // render message 'no articles!'
        renderEmpty();
      }
    });
  };

  function renderArticles(articles) {
    // passed arg is array of JSON containing all available articles in db
    const articlePanels = [];
    // pass each JSON object to function createPanel 
    for (let i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
  
    // now we have createPanel HTML stored in array articlePanels
    // append each to main articleContainer
    articleContainer.append(articlePanels); 
  }
  
  function createPanel(article) {
    // take a single JSON object and create jQuery element composed of formatted HTML
    let panel = $(
        `<div id="${article._id}" class="panel panel-default panel-margin">
            <div id="headline-panel" class="panel-heading clearfix">
              <p class="panel-title align-middle"><a href="${article.url}" target="_blank">${article.title}</a></p>
              <button type="button" class="btn btn-success pull-right btn-save">Save Article</button>
  
            </div>
            <div class="panel-body">
              <div class="col-lg-2 col-md-2 col-sm-2 news-thumb" >
              <a href="${article.url}" target="_blank"><img width="200px" class="img-responsive img-thumbnail news-thumb" src="${article.imgUrl}" alt="${article.title}" /></a>
              </div> 
              <div class="col-lg-10 col-md-10 col-sm-10 summary-text" >
              <p>${article.summary}</p>
              </div> 
            </div>
        </div>`
    );
    // attach article id to determine article to save
    panel.data("_id", article._id);
    // return contructed jQuery panel
    return panel;
  }
  
  function renderEmpty() {
    // we don't have any new articles!
    const emptyAlert = $(
        `<div class='alert alert-info text-center'>
        <h4>Looks like we don't have any new articles.</h4>
        </div>
        <div class='panel panel-default'>
        <div class='panel-heading text-center'>
        <h3>What Would You Like To Do?</h3>
        </div>
        <div class='panel-body text-center'>
        <h4><a class='scrape-new'>Try Scraping New Articles</a></h4>
        <h4><a href='/saved'>Go to Saved Articles</a></h4>
        </div>
        </div>`
    );
    // append alert data to main container
    articleContainer.append(emptyAlert);
  }
  
  function handleArticleSave() {
    // user saves an article
    // each article was saved with an id using .data method - retrieve it here
    let articleToSave = $(this) 
      .parents(".panel")
      .data();
    articleToSave.saved = true;

    // use put to update existing record and reload remaining articles page
    $.ajax({
      method: "PUT",
      url: `/api/headlines/${articleToSave._id}`,
      data: articleToSave
    }).then(data => {
      if(data.saved) {
        initPage();
      }
    });
  }
  
  function handleArticleScrape() {
    // scrape NPR, compare to articles already in db
    // re-render to DOM and alert user to number (if any) of new articles saved
    $.get("/api/fetch").then(data => {
      initPage();
      bootbox.alert(`<h3 class='text-center m-top-80'>${ data.message }</h3>`)
    });
  }
}); 
