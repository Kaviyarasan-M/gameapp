var express = require('express');
var mongoose = require('mongoose');
var config = require('../config/database');
var User = require('../app/models/user');
var Task = require('../app/models/task');


var app = express();
var router = express.Router();



mongoose.connect(config.database);
app.set('superSecret',config.secret);




/*Add task api */
router.post('/addtask', function(req, res, next) {
	 var userinfo = new Task({
	 	task_no: req.body.task_no,
	 	name: req.body.name,
	 	main_cat: req.body.main_cat,
	 	sub_cat: req.body.sub_cat,
	 	desc: req.body.desc,
	 	tagline: req.body.tagline,
	 	points: req.body.points,
	 	posted_on: req.body.posted_on
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
	 	if(users) {
	 		res.send({users});		
		}	
	})
});





/* Task list*/
router.get('/tasklist', function (req, res){ 
	Task.find({},['task_no','name'], function(err, tasks) {    
		 res.send({tasks});
		});   
		    
	})


/* Task details */
router.post('/taskdetails', function (req, res){ 
	Task.findOne({"_id":req.body.task_id}, function(err, users) {    
		 res.send({success:users});
		});   
		    
	})


/*Accepted Task*/
router.post('/taskacceptence',function(req,res,next){	
	User.findOneAndUpdate(
	{"_id":req.body.user_id},		
	{
	$push:{"accepted_task":{
	"task_id":req.body.task_id
	}}},		
	{
		safe: true, 
		upsert: true, new : true
	},        
	function(err, model) { 
	if (err) return JSON.stringify(err);
	if(model) {

			res.send({"message": model});
		}	           
		        
	}	
)})




/*Completed Task*/
router.post('/taskcompleted',function(req,res,next){	
	User.findOneAndUpdate(
	{"_id":req.body.user_id},		
	{
	$push:{"completed_task":{
	"task_id":req.body.task_id
	}}},		
	{
		safe: true, 
		upsert: true, new : true
	},        
	function(err, model) { 
	if (err) return JSON.stringify(err);
	if(model) {

			res.send({"message": model});
		}	           
		        
	}	
)})











module.exports = router;