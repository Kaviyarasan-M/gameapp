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
	 var task = new Task({
	 	task_no: req.body.task_no,
	 	name: req.body.name,
	 	category: req.body.category,
	 	description: req.body.description,
	 	tagline: req.body.tagline,
	 	points: req.body.points,
	 	posted_on: req.body.posted_on
	 });
	 task.save(function (err,Asignup) {
	 	if (err) return JSON.stringify(err);
	 	//saved
	 	if(Asignup) {
			
			res.send({status: "true", task});
		}	
	 })
});





/*Insta Users*/
router.post('/userdetails',function(req, res, next){
	var user = new User({
		user_name: req.body.user_name
	});
	user.save(function (err,user) {
		if (err) return JSON.stringify(err);
	 	//saved
	 	if(user) {
	 		res.send({status: "true", user});		
		}	
	})
});





/* Task list*/
router.get('/group_tasklist', function (req, res){ 
	Task.find({"category":"Group"},['task_no','name'], function(err, tasks) {  
	if(tasks){
		 res.send({status: "true", tasks});

	} else {
		 res.send({status: "false"});

	}
	
		});   
		    
	})

/* Task list*/
router.get('/individual_tasklist', function (req, res){ 
	Task.find({"category":"Individual"},['task_no','name'], function(err, tasks) {   
	if(tasks){
		 res.send({status: "true", tasks});

	} else {
		 res.send({status: "false"});

	}	 
		});   
		    
	})


/* Task details */
router.post('/taskdetails', function (req, res){ 
	Task.findOne({"_id":req.body.task_id}, function(err, task) {    
	if(task){
		 res.send({status: "true", task});

	}else {
		 res.send({status: "false"});

	}
		});   
		    
	})


/*Accepted Task*/
router.post('/taskacceptence',function(req,res,next){	
	User.findOneAndUpdate(
	{"_id":req.body.user_id},		
	{
	$push:{"accepted_task":{
	"task_id":req.body.task_id,
	"name":req.body.name,
	"category":req.body.category,
	"description":req.body.description,
	"tagline":req.body.tagline,
	"points":req.body.points

	}}},		
	{
		safe: true, 
		upsert: true, new : true
	},        
	function(err, model) { 
	if(model){
		 res.send({status: "true", model});

	} else {
		 res.send({status: "false"});

	}	           
		        
	}	
)})




/*Completed Task*/
router.post('/taskcompleted',function(req,res,next){	
	User.findOneAndUpdate(
	{"_id":req.body.user_id},		
	{
	$push:{"completed_task":{
	"task_id":req.body.task_id,
	"name":req.body.name,
	"category":req.body.category,
	"description":req.body.description,
	"tagline":req.body.tagline,
	"points":req.body.points
	}}},		
	{
		safe: true, 
		upsert: true, new : true
	},        
	function(err, model) { 
	if(model){


		 res.send({status: "true", model});

	} else {
		 res.send({status: "false"});

	}	           
		        
	}	
)})





module.exports = router;