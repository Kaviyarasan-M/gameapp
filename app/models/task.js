var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('Task', new Schema({

    task_id:{
    	type : Schema.Types.ObjectId,
		ref : 'Task'
    },
     task_no: {
     	type: String,
     	unique: true
     },
     name:String,
     main_cat: String,
     sub_cat: String,
     desc:String,
     tagline: String,
     points: String,
     posted_on: String
}));


