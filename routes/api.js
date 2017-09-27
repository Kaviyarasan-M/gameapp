var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
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
router.post('/login',function(req, res, next){
	var user = new User({
		user_name: req.body.user_name,
		img: req.body.img
	});
	user.save(function (err,user) {
		if (err) return JSON.stringify(err);
	 	//saved
	 	if(user) {
	 		       // var token = jwt.sign(user, app.get('superSecret'), {				
		 	       // expiresIn: 86400 // expires in 24 hours //basically in seconds			
		       // });
			// res.send({"token":token});
	 		res.send({status: "true", user});		
		}else{
			res.send({status: "true", message: "failure"});		
		}
	})
});


// ---------------------------------------------------------// route middleware to authenticate and check token// ---------------------------------------------------------
/*router.use(function(req, res, next) {	
// check header or url parameters or post parameters for token
	var token = req.body.token || req.param('token') || req.headers['token'];	
	// decode token
	if (token) {	
		// verifies secret and checks exp	
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {				
				if (err) {	
					return res.json({ success: false, message: 'Failed to authenticate token.' });			
				} else {		
					// if everything is good, save to request for use in other routes	
					req.decoded = decoded;		
					next();		
				}		
		});
	} else {		
		// if there is no token	
		// return an error	
		return res.status(403).send({ 		
			success: false, 	
			message: 'No token provided.'		
		});
	}
});
*/
// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------


/* Task list*/
router.get('/group_tasklist', function (req, res){ 
	Task.find({"category":"Group"},['task_no','name','points'], function(err, tasks) {  
	if(tasks){
		 res.send({status: "true", tasks});

	}else{
			res.send({status: "true", message: "failure"});		
		}
	
		});   
		    
	})

/* Task list*/
router.get('/individual_tasklist', function (req, res){ 
	Task.find({"category":"Individual"},['task_no','name','points'], function(err, tasks) {   
	if(tasks){
		 res.send({status: "true", tasks});

	} else{
			res.send({status: "true", message: "failure"});		
		} 
		});   
		    
	})


/* Task details */
router.post('/taskdetails', function (req, res){ 
	Task.findOne({"_id":req.body.task_id}, function(err, task) {    
	if(task){
		 res.send({status: "true", task});

	}else {
		 res.send({status: "true", message: "failure"});

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

		 res.send({status: "true", message: "success"});

	} else {
		 res.send({status: "true", message: "failure"});

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

		User.findOneAndUpdate(
				{"_id":req.body.user_id},		
				{
				$pull:{"accepted_task":{
				"task_id":req.body.task_id

				}}},		
				{
					safe: true, 
					upsert: true, new : true
		 },function (err, mod){
		 	 res.send({status: "true", message: "success", mod});
		 	})

		

	} else {
		 res.send({status: "true", message: "failure"});

	}	           
		        
	}	
)})




/* User details */
router.post('/user_info', function (req, res){ 
	User.findOne({"_id":req.body.user_id}, function(err, userinfo) {    
	if(userinfo){
		 res.send({status: "true", userinfo});

	}else{
		 res.send({status: "true", message: "failure"});

	}
	});   
		    
	})


/* User details */
router.post('/test', function (req, res){ 
	User.findOneAndUpdate(
				{"_id":req.body.user_id},		
				{
				$pull:{"accepted_task":{
				"task_id":req.body.task_id

				}}},		
				{
					safe: true, 
					upsert: true, new : true
		 },function (err, mod){
		 	 res.send({status: "true", message: "success", mod});
		 	})  
		    
	})







module.exports = router;