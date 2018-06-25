
$(document).ready(function() {
  var articleContainer = $(".article-container");
  // add event listeners to handle articles and notes
  $(document).on("click", ".btn.delete", handleArticleDelete);
  $(document).on("click", ".btn.notes", handleArticleNotes);
  $(document).on("click", ".btn.save", handleNoteSave);
  $(document).on("click", ".btn.note-delete", handleNoteDelete);

  // load saved articles
  initPage();

  function initPage() {
    // empty container / run AJAX request for saved headlines
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(data => {
      // if we have saved articles, render to DOM
      if(data && data.length) {
        renderArticles(data);
      }else {
        // render message 'no saved articles!'
        renderEmpty();
      }
    });
  }

  function renderArticles(articles) {
    // we are passed an array of JSON containing all available articles in db
    const articlePanels = [];
    // pass each JSON object to function createPanel 
    for (var i = 0; i < articles.length; i++) {
      articlePanels.push(createPanel(articles[i]));
    }
  
    // now we have createPanel HTML stored in array articlePanels
    // append each to main articleContainer
    articleContainer.append(articlePanels); 
  }

  function createPanel(article) {
    // take a single JSON object and create jQuery element composed of formatted HTML
    let panel = $(
        `<div class="panel panel-default">
            <div id="headline-panel" class="panel-heading clearfix">
              <h3 class="panel-title align-middle"><a href="${article.url}" target="_blank">${article.title}</a>
              <button type="button" class="btn btn-info pull-right notes">Article Notes</button></h3>
              <button type="button" class="btn btn-danger pull-right delete">Delete From Saved</button></h3>
  
            </div>
            <div class="panel-body">
              <div class="col-lg-3 col-md-3 col-sm-3 news-thumb" >
              <a href="${article.url}" target="_blank"><img width="200px" class="img-responsive img-thumbnail news-thumb" src="${article.imgUrl}" alt="${article.title}" /></a>
              </div> 
              <div class="col-lg-9 col-md-9 col-sm-9" >
              <div>${article.summary}</div>
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
    // we don't have any saved articles!
    const emptyAlert = $(
        `<div class='alert alert-warning text-center'>
        <h4>Looks like we don't have any saved articles.</h4>
        </div>
        <div class='panel panel-default'>
        <div class='panel-heading text-center'>
        <h3>Would You Like To Browse Available Articles?</h3>
        </div>
        <div class='panel-body text-center'>
        <h4><a href='/'>Browse Articles</a></h4>
        </div>
        </div>`
    );
    // append alert data to main container
    articleContainer.append(emptyAlert);
  }

  function renderNotesList(data) {
    // handles rendering note list to notes modal
    // array of notes will render once finished
    // currentNote will temporarily store each note
    var notesToRender = [];
    var currentNote;
    if(!data.notes.length) {
      currentNote = `<li class="list-group-item">No notes for this article yet.</li>`;
      notesToRender.push(currentNote);
    }else {
      for(let i = 0; i < data.notes.length; i++) {
        // construct li element to contain noteText and delete button
        currentNote = $(
          `<li class="list-group-item note">${data.notes[i].noteText}
          <button class="btn btn-danger note-delete">x</button></li>`
        );
        // store note id on delete button for easy access
        currentNote.children("button").data("_id", data.notes[i]._id);
        // add currentNote to notesToRender array
        notesToRender.push(currentNote);
      }
    }
    // append notesToRender to note-container in note modal
    $(".note-container").append(notesToRender);
  }

  function handleArticleDelete() {
    // delete the panel the delete buttons sits inside of
    const articleToDelete = $(this).parents(".panel").data();
    $.ajax({
      method: "DELETE",
      url: `/api/headlines/${articleToDelete._id}`
    }).then(data => {
      // re-render list of saved articles
      if(data.ok) {
        initPage();
      }
    });
  }

  function handleArticleNotes() {
    // open notes modal
    // get article id from panel element
    var currentArticle = $(this).parents(".panel").data();
    // get associated notes
    $.get("/api/notes/" + currentArticle._id).then(data => {
      // construct notes HTML
      var modalText = 
        `<div class="container-fluid text-center">
        <h4>Notes For Article: ${currentArticle._id}</h4>
        <hr />
        <ul class="list-group note-container"></ul>
        <textarea placeholder="New Note" rows"4" cols="70"></textarea>
        <button class="btn btn-success save">Save Note</button>
        </div>`;
        // add HTML to note modal
        bootbox.dialog({
          message: modalText,
          closeButton: true
        });
        var noteData = {
          _id: currentArticle._id,
          notes: data || []
        };
        // put id on save button for easy acess when adding new note
        $(".btn.save").data("article", noteData);
        // populate noteHTML inside just opened modal
        renderNotesList(noteData);
    });
  }

  function handleNoteSave() {
    // save new note - set variable to hold note from input box
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();
    // if we have a new note, post to db and close modal
    if(newNote) {
      noteData = {
        _id: $(this).data("article")._id,
        noteText: newNote
      };
      $.post("/api/notes", noteData).then( () => {
        bootbox.hideAll();
      })
      .catch(err => {
        res.json({
          message: `got a problem.`
        });
      });
    }
  }

  function handleNoteDelete() {
    // grab id stored on the delete button and delete note
    var noteToDelete = $(this).data("_id");
    // delete note and close modal
    $.ajax({
      url: `/api/notes/${noteToDelete}`,
      method: "DELETE"
    }).then( () => {
      bootbox.hideAll();
    });
  }
});


 