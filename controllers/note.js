//controller - notes
const db = require("../models");

module.exports = {
  // find all notes by id
  findAll: function(req,res) {
    db.Note
      .find({ article: req.params.id })
      .then(dbNote => {
        res.json(dbNote);
      })
      .catch(err => {res.json(err) })
  },
  // delete a note by id
  delete: function(req,res) {
    db.Note
      .remove({ _id: req.params.id })
      .then(dbNote => {
        res.json(dbNote);
      })
      .catch(err => {res.json(err) })
  }
};