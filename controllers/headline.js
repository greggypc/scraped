//controller - headlines

var db = require("../models");

module.exports = {
  // find all headlines, sort by date and return
  findAll: function(req, res) {
    db.Headline
      .find(req.query)
      .sort({ date: -1 })
      .then( function(dbHeadline) {
        res.json(dbHeadline);
      })
      .catch(err => {res.json(err) })
  },
  // find all notes attached to a specific headline id
  findOne: function(req, res) {
    db.Headline
    .findOne({ _id: req.params.id })
    .populate('note')
    .then(function(dbHeadline) {
      res.json(dbHeadline);
    })
     .catch(err => {res.json(err) })
  },
  // post new note atached to specific headline
  create: function(req,res) {
    db.Note
      .create(req.body)
      .then(function(dbNote) {
        return Headline.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true })
      })
      .then(function(dbHeadline){
        res.json(dbHeadline);
      })
      .catch(err => {res.json(err) })
  },

  // delete a specific headline
  delete: function(req, res) {
    db.Headline.remove({ _id: req.params.id }).then( function(dbHeadline) {
      res.json(dbHeadline);
    })
    .catch(err => {res.json(err) })

  },
  // update when headline is saved
  update: function(req, res) {
    db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(dbHeadline => {
      res.json(dbHeadline);
    })
    // .catch(err => {res.json(err) })
  }
};



