
  // hold our individual articles
  var savedArticlesContainer = $(".saved-articles-container");
  
  // Click event to delete save headline
  $(document).on("click", "button.btn-article-delete", handleArticleDelete);
  // Click event to fire article modal
  $(document).on("click", "button.note-modal", handleNoteModal);
  // Click event to delete a note
  $(document).on("click", "button.btn-delete-note", handleDeleteNote);
   // Click event to save new note
  $(document).on("click", "button.btn-save-note", handleSaveNote);

  function getSavedArticles() {
    $.get("/api/saved/"), function (data) {
      saveArticles = data;
      if(!saveArticles) {
        displayEmptyArticles();
      }else {
        displaySavedArticles();
      }
    }
  }

 