//controller - headlines

const db = require("../models");

module.exports = {
  // find all headlines, sort by date and return
  findAll: function(req, res) {
    db.Headline
      .find(req.query)
      .sort({ date: -1 })
      .then(dbHeadline => {
        res.json(dbHeadline);
      });
  },
  // delete a specific headline
  delete: function(req, res) {
    db.Headline.remove({ _id: req.params.id }).then(dbHeadline => {
      res.json(dbHeadline);
    });
  },
  // update specific headline
  update: function(req, res) {
    db.Headline.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(dbHeadline => {
      res.json(dbHeadline);
    });
  }
};



