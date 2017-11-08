var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('Task', new Schema({

    
     task_no: {
     	type: String,
     	unique: true
     },
     name:String,
     category: String,
     description:String,
     tagline: String,
     points: String,
     posted_on: String,
     task_status: String
}));


