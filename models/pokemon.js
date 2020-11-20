// Load required packages
var mongoose = require('mongoose');

// Define our Pokemon Schema
var pokeSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('pokemon', pokeSchema);