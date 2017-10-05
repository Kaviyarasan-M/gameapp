var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//set up a mongoose model
module.exports = mongoose.model('Leaderboard', new Schema({

     user_id: String,
     full_name: String,
     total_points: String, 
     tasks:[{
     task_id: String,
     task_status: String,
     points: String}]
}));


