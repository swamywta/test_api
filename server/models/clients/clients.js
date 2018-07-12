var mongoose = require('mongoose');
var Schema = mongoose.schema;

var Clients = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  company: String,
  zip: Number
});
mongoose.model('Clients', Clients);
