var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('User', new Schema({

      id:{ type: Number,
        unique:true },
      user_name: String,
      full_name: String,
      bio: String,
      website: String,
      profile_picture: String,
      access_token: String,
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

