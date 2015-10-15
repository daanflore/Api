//Load packages
var mongoose = require('mongoose');

//Define our recept schema
var ReceptSchema = new mongoose.Schema({
  name:String,
  omschrijving:String,
  quantity: Number
});

//Export the Mongoose model
module.exports = mongoose.model('recept', ReceptSchema);
