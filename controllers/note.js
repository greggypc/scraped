//controller - notes

const db = require("../models");

module.exports = {
  // find one note
  findOne(req,res) {
    db.Note
      .findOne(req.query)
      .then(dbNote => {
        res.json(dbNote);
      });
  },
  //create a new note
  create(req,res) {
    db.Note
      .create(req.body)
      .then(dbNote => {
        res.json(dbNote);
      })
      .catch(function(err){
        res.json(err);
      })
  },
  // delete a note by id
  delete(req,res) {
    db.Note
      .remove({ _id: req.params.id })
      .then(dbNote => {
        res.json(dbNote);
      });
  }
};