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
     category: String,
     //sub_cat: String,
     description:String,
     tagline: String,
     points: String,
     acceptance_status: {
      type:Boolean,
      default: false
     },
     posted_on: String
}));


