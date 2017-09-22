var express = require('express');
var mongoose = require('mongoose');
var config = require('../config/database');
var User = require('../app/models/user');
var Task = require('../app/models/task');


var app = express();
var router = express.Router();



mongoose.connect(config.database);
app.set('superSecret',config.secret);




/*Admin sign up page. */
router.post('/addtask', function(req, res, next) {
	 var userinfo = new Task({
	 	task_no: req.body.task_no,
	 	task_name: req.body.task_name,
	 	task_maincat: req.body.task_maincat,
	 	task_subcat: req.body.task_subcat,
	 	task_desc: req.body.task_desc,
	 	task_tag: req.body.task_tag,
	 	task_status: req.body.task_status
	 });
	 userinfo.save(function (err,Asignup) {
	 	if (err) return JSON.stringify(err);
	 	//saved
	 	if(Asignup) {
			
			res.send({userinfo});
		}	
	 })
});





/*Insta Users*/
router.post('/userdetails',function(req, res, next){
	var users = new User({
		user_id: req.body.user_id,
		user_name: req.body.user_name
	});
	users.save(function (err,users) {
		if (err) return JSON.stringify(err);
	 	//saved
	 	if(fav) {
	 		res.send({users});		
		}	
	})
});





/* Task list*/
router.get('/tasklsit', function (req, res){ 
	Task.find({}, function(err, tasks) {    
		 res.send({tasks});
		});   
		    
	})









module.exports = router;