var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('User', new Schema({

     user_id:String,
     user_name:String
}));

