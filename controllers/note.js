//controller - notes

var db = require("../models");

module.exports = {
  // find one note
  findById: function(req,res) {
    db.Note
      .find(req.query)
      .then(function(dbNote) {
        res.json(dbNote);
      })
      .catch(err => {res.json(err) })
  },
  //create a new note
  create: function(req,res) {
    db.Note
      .create(req.body)
      .then(function(dbNote) {
        // return db.Article.findOneAndUpdate({ _id: req.params.id }, {$push: { note: dbNote._id }}, { new: true });

        res.json(dbNote);
      })
      .catch(err => {res.json(err) })
  },
  // delete a note by id
  delete: function(req,res) {
    db.Note
      .remove({ _id: req.params.id })
      .then(function(dbNote) {
        res.json(dbNote);
      })
      // .catch(err => {res.json(err) })
  }
};