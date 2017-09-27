var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('User', new Schema({

     user_id:{
     	type : Schema.Types.ObjectId,
		  ref : 'User'
     },
     user_name:{
     	type: String,
     	unique: true
     },
     img: { data: Buffer, contentType: String }
     accepted_task:[
     {
      task_id: String,
      name: String,
      category: String,
      description: String,
      tagline: String,
      points: String
     }

     ],
     completed_task:[
     {
     	task_id: String,
     	name: String,
     	category: String,
     	description: String,
      tagline: String,
      points: String
      }
	]
}));

