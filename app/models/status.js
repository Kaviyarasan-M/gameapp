var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('Status', new Schema({

  user_name: String,
  tasks:[]

     
}));

