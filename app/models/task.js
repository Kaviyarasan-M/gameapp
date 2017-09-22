var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('Task', new Schema({

    task_id:{
    	type : Schema.Types.ObjectId,
		ref : 'Task'
    },
     task_no: {
     	type: Number,
     	unique: true
     },
     task_name:String,
     task_maincat: String,
     task_subcat: String,
     task_desc:String,
     task_tag: String,
     task_status: {
     type:Boolean,
     default: false
  }
}));


