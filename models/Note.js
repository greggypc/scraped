const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
const noteSchema = new Schema({
  //headline associated with the note
  article: {
    type: Schema.Types.ObjectId,
    unique: false,
    ref: "Headline"
  },
  noteText: String
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Note", noteSchema);

// Export the Note model
module.exports = Note;
