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
	 	cat: req.body.cat,
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
router.get('/group_tasklist', function (req, res){ 
	Task.find({"cat":"Group"},['task_no','name'], function(err, tasks) {  
	if(tasks){
		 res.send({status: "true", tasks});

	} else {
		 res.send({status: "false"});

	}
	
		});   
		    
	})

/* Task list*/
router.get('/individual_tasklist', function (req, res){ 
	Task.find({"cat":"Individual"},['task_no','name'], function(err, tasks) {   
	if(tasks){
		 res.send({status: "true", tasks});

	} else {
		 res.send({status: "false"});

	}	 
		});   
		    
	})


/* Task details */
router.post('/taskdetails', function (req, res){ 
	Task.findOne({"_id":req.body.task_id}, function(err, users) {    
	if(users){
		 res.send({status: "true", users});

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
	"desc":req.body.desc,
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
	$pull:{"completed_task":{
	"task_id":req.body.task_id
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