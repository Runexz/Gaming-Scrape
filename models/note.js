var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
  // `headline` is of type String
  headline: String,
  // `summary` is of type String
  summary: String,
  // `URL` is a type of String
  link: String
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("Note", NoteSchema);

// Export the Note model
module.exports = Note;
