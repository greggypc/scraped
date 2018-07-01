var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
var NoteSchema = new Schema({
  //headline associated with the note
  article: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  date: {
    type: Date,
    default: Date.now
  },
  noteText: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
