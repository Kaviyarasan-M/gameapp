var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('User', new Schema({

      id: Number,
      user_name: String,
      full_name: String,
      bio: String,
      rank: String,
      position: Number,
      website: String,
      profile_picture: String,
      access_token: String,
      code: String,
      individual: Number,
      group:Number,
      accepted_task:[
     {
      task_id: String,
      task_no: Number,
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
      task_no: Number,
     	name: String,
     	category: String,
     	description: String,
      tagline: String,
      points: String
      }],
      tasks:[]
}));

