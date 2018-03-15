//controller - headline

// Grab the articles as a json
$.getJSON("/", function(headlines) {
  // For each one
  for (var i = 0; i < headlines.length; i++) {
    // Display on the page
    $(".articles-container").append(`
      <div class="row">
        <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"><a href="${headlines.link}" target="_blank">{{healines.title}}</a></h3>
          <a class="btn btn-success btn-save" id="${headlines._id}">Save Article</a>
        </div>
        </div>
      </div>
    `);
  }
});

