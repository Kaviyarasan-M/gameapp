var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('Task', new Schema({

     task_id:String,
     task_name:String
}));

