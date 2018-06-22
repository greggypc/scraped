const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
const noteSchema = new Schema({
  //headline associated with the note
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  // date is string
  date: {
    type: Date,
    default: Date.now
  },
  // note is a string
  noteText: String
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;
