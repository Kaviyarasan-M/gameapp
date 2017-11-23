var express = require('express');
var mongoose = require('mongoose');
var User = require('../app/models/user');
var Task = require('../app/models/task');
var Status = require('../app/models/status');
var Leaderboard = require('../app/models/leaderboard');
var morgan = require('morgan');
var config = require('../config/config');


var app = express();
var router = express.Router();

var authUser = require('../app/service/authService');


mongoose.connect(config.db.uri);



router.get('/login', function (request, response) {
	response.redirect(config.instagram.auth_url);
});

router.get('/auth', authUser);







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


router.post('/tasklist', function(req, res, next){


	User.find({}, function(err, tasks) {  
	if(tasks){
		 	
		 	 User.findOne({"user_name":req.body.user_name},function(err,user){
		        if(user) {
		        	      Status.findOne({"user_name":req.body.user_name},function(err, status){
		        	      	if(status){
		        	      		res.send({status:"true", user:status})

		        	      	}else{
		        	      		var statusinfo = new Status({
                            	user_name: req.body.user_name
                                 });
						        statusinfo.save(function (err, task) {
								if (err) return JSON.stringify(err);
								//saved
								if(task) {
										Status.findOneAndUpdate({"user_name":req.body.user_name},		
										{ $push:{"tasks":{$each:tasks}}},		
												{
												safe: true, 
												upsert: true, new : true
												},        
												function(err, tasks) { 
												if (err) return JSON.stringify(err);
												if(tasks) {

												res.send({status: "true", user: tasks });
												}})
								        }	
							    })
		        	      	    }
		        	     })                   
		        	          
			            }else{
			                    res.send({status:"false"})
		                   }	
	         })	

	}else{
			res.send({status: "failure", message: "failure"});		
		}
	
		});   
			



})



/* Task list*/
router.get('/tasklistss', function (req, res){ 
	Task.find({}, function(err, tasks) {  
	if(tasks){
		 res.send({status: "true", tasks});

	}else{
			res.send({status: "failure", message: "failure"});		
		}
	
		});   
			
	})



/* Group Task list*/
router.get('/group_tasklist', function (req, res){ 
	Task.find({"category":"Group"},['task_no','name','points'], function(err, tasks) {  
	if(tasks){
		 res.send({status: "true", tasks});

	}else{
			res.send({status: "true", message: "failure"});		
		}
	
		});   
			
	})

/* IndivTask list*/
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
/*router.post('/next_task', function (req, res){ 

    var task_no = parseInt(req.body.task_no) + 1;

   	Task.findOne({"task_no":task_no}, function(err, task) {    
	if(task){
			Leaderboard.find({"user_id": req.body.user_id, "tasks.task_no":task_no},{ 'tasks.$': 1}, function(err, leaderboard) { 
 
				if(leaderboard!=""){
					var task_status = leaderboard[0].tasks[0].task_status; 
					console.log(task_status)
				res.send({status: "true", task,task_status});

				}else {

				res.send({status: "true", task, task_status: "pending"});

				}
				})
	}else {
		 res.send({status: "failure", message: "No more challanges"});

	}
		});   
			
	})*/



/* Next Task */
router.post('/next_task', function (req, res){ 

    var task_no = req.body.task_no + 1;

   	Status.find({"user_name":req.body.user_name,"tasks.task_no":task_no},{ 'tasks.$': 1}, function(err, tasks) {    
	if(tasks){
             var task = tasks[0].tasks[0];
         	res.send({status:"true", task})
	}else {
		 res.send({status: "failure", message: "No more challanges"});

	}
		});   
			
	})


/* Prev Task */
router.post('/prev_task', function (req, res){ 

    var task_no = req.body.task_no - 1;

   	Status.find({"user_name":req.body.user_name,"tasks.task_no":task_no},{ 'tasks.$': 1}, function(err, tasks) {    
	if(tasks){
             var task = tasks[0].tasks[0];
         	res.send({status:"true", task})
	}else {
		 res.send({status: "failure", message: "No more challanges"});

	}
		});   
			
	})

/* Task details */
router.post('/taskdetails', function (req, res){ 
	Status.find({"user_name":req.body.user_name,"tasks.task_no":req.body.task_no},{ 'tasks.$': 1}, function(err, tasks) {    
	if(tasks){

		    var task = tasks[0].tasks[0];
		 
            
         	res.send({status:"true", task})
	}else {
		 res.send({status: "failure", message: "No more challanges"});

	}});   
			
	})


/* Task details */
/*router.post('/prev_task', function (req, res){ 

    var task_no = parseInt(req.body.task_no) - 1;

   	Task.findOne({"task_no":task_no}, function(err, task) {    
	if(task){
			Leaderboard.find({"user_id": req.body.user_id, "tasks.task_no":task_no},{ 'tasks.$': 1}, function(err, leaderboard) { 
 
				if(leaderboard!=""){
					var task_status = leaderboard[0].tasks[0].task_status; 
					console.log(task_status)
				res.send({status: "true", task,task_status});

				}else {

				res.send({status: "true", task, task_status: "pending"});

				}
				})
	}else {
		 res.send({status: "failure", message: "No more challanges"});

	}
		});   
			
	})*/




/* Task details */
/*router.post('/taskdetails', function (req, res){ 
	Task.findOne({"_id":req.body.task_id}, function(err, task) {    
	if(task){
			Leaderboard.find({"user_id": req.body.user_id, "tasks.task_id":req.body.task_id},{ 'tasks.$': 1}, function(err, leaderboard) { 
 
				if(leaderboard!=""){
					var task_status = leaderboard[0].tasks[0].task_status; 
					console.log(task_status)
				res.send({status: "true", task,task_status});

				}else {

				res.send({status: "true", task, task_status: "Pending"});

				}
				})


	}else {
		 res.send({status: "failure", message: "failure"});

	}
		});   
			
	})*/


/*Accepted Task*/
router.post('/taskacceptence',function(req,res,next){	
	User.findOneAndUpdate(
	{"_id":req.body.user_id},		
	{
	$push:{"accepted_task":{
	"task_id":req.body.task_id,
	"task_no":req.body.task_no,
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
		    Status.findOneAndUpdate({"user_name": req.body.user_name,"tasks.task_no":req.body.task_no},{
								$set:{"tasks.$.task_status": "accepted"}},{new:true}, function(err,user){

			  Leaderboard.findOne({"user_id":req.body.user_id}, function(err, user) {    
			  if(user){
						Leaderboard.findOneAndUpdate({"user_id":req.body.user_id},		
						{ $push:{"tasks":{
								"task_id":req.body.task_id,
								"task_status":"accepted",
								"points":"0"}}},		
								{
								safe: true, 
								upsert: true, new : true
								},        
								function(err, model) { 
								if (err) return JSON.stringify(err);
								if(model) {

								res.send({status: "true", message: "success"});
								}})
						
							}else{
								User.findOne({"_id":req.body.user_id}, function(err, user) {    
								if(user){

									var leaderboard = new Leaderboard({
										user_id: req.body.user_id,
										user_name: user.full_name,
										profile_img:user.profile_picture,
										total_points: 0
									});
									
									leaderboard.save(function (err,Asignup) {
									if (err) return JSON.stringify(err);
									//saved
									if(Asignup) {
										Leaderboard.findOneAndUpdate({"user_id":req.body.user_id},{
											$push:{"tasks":{
											"task_id":req.body.task_id,
											"task_status":"accepted",
											"points":"0"}}
										},{
										safe: true, 
										upsert: true, new : true
										},        
										function(err, model) { 
									if (err) return JSON.stringify(err);
									if(model) {

									res.send({status: "true", message: "success"});
									}})
									//res.send({status: "true", message: "success"});
									}	
									})
									// res.send({status: "true", message: "success", user});

								}else{
									 res.send({status: "true", message: "failure"});

								}
								})
							
									
								}
							});				
})
		 

	} else {
		 res.send({status: "failure", message: "failure"});

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
	"task_no":req.body.task_no,
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

			 Status.findOneAndUpdate({"user_name": req.body.user_name,"tasks.task_no":req.body.task_no},{
								$set:{"tasks.$.task_status": "completed"}},{new:true}, function(err,user){


	    	User.findOne({"_id":req.body.user_id}, function(err, user) {    
				if(user){
				User.findOne({"accepted_task.task_id":req.body.task_id}, function(err, user) {    
				if(user){
				User.findOneAndUpdate({"_id":req.body.user_id},{
				$pull:{"accepted_task":{
				"task_id":req.body.task_id
				}}},		
				{
				safe: true, 
				upsert: true, new : true
				},function (err, mod){
				if(mod){
						Leaderboard.findOne({"user_id":req.body.user_id},function(err, user1) { 
						if (user1){

							Leaderboard.findOneAndUpdate({"user_id":req.body.user_id,"tasks.task_id":req.body.task_id},{
								$set:{"total_points": user1.total_points + parseInt(req.body.points),"tasks.$.task_status": "completed", 
									  "tasks.$.points": req.body.points}},{new:true}, function(err,user){
							
							if(user){
								res.send({status: "true", message: "success"})
							}else{
								console.log(err)
								res.send({status: "true", message: "failure"})
							}})	
						}	
						})
				   
				

				//res.send({status: "true", message: "success"});
				}else{
				res.send({status: "failure", message: "failure"});
				}
				}) 

				}else{
				res.send({status: "failure", message: "Task not found"});

				}
				})
				}else{
				res.send({status: "failure", message: "User not found"});

				}
				}); 

})

				/*Leaderboard.findOneAndUpdate({"user_id":req.body.user_id},{
					$set:{"task_status": "completed", "points": req.body.points}},{new:true}, function(err,user){
				if(err){
					res.send({status: "true", message: "failure"})
				}else{
					res.send({status: "true", message: "successs", model })
				}})	*/

		} else {
		 res.send({status: "true", message: "failure"});

		}	           
				
		}	
	)})




/* User details */
router.post('/user_info', function (req, res){ 
	User.findOne({"user_name":req.body.user_name}, function(err, user) {    
	if(user){
           
        
		  res.send({status: "true", message: "success", user});

	}else{
		 res.send({status: "failure", message: "failure"});

	}});   
			
	})


/* User remove accepted task */
router.post('/taskremove', function (req, res){ 

	 User.findOne({"_id":req.body.user_id}, function(err, user) {    
		if(user){

			 Status.findOneAndUpdate({"user_name": req.body.user_name,"tasks.task_no":req.body.task_no},{
								$set:{"tasks.$.task_status": "Pending"}},{new:true}, function(err,user){

					User.findOne({"accepted_task.task_no":req.body.task_no}, function(err, user) {    
					if(user){

								User.findOneAndUpdate({"_id":req.body.user_id},{
								$pull:{"accepted_task":{
								"task_no":req.body.task_no
								}}},		
								{
									multi:true
								},function (err, mod){
								if(mod){      
										Leaderboard.findOneAndUpdate({"user_id":req.body.user_id,"tasks.task_no":req.body.task_no},{
										$pull:{"tasks":{
											"task_no":req.body.task_no
										}}},		
										{
											multi:true
										},function (err, mod){
										if(mod){
											res.send({status: "true", message: "success"});
											}else{
											res.send({status: "true", message: "failure"});
											}
											}) 
						
								//res.send({status: "true", message: "success"});
								}else{
								res.send({status: "true", message: "failure"});
								}
								}) 

					}else{
					res.send({status: "true", message: "Task not found"});

					}
					})



      })


		}else{
		 res.send({status: "failure", message: "User not found"});

		}
		});  
	})




/* Leader Board */
router.post('/leaderboard', function (req, res){ 

	Leaderboard.find({"user_id":req.body.user_id},function(err, user) { 
		if (user){

		/* res.render('/leaderboard',{user:user},function(err,favlist){
			res.send({status:"true",user});
		});*/
		res.send({status:"true", user});
		}else{
			res.send({status:"failure",message: "User not found"});
		}
	});
	  
			
	})

/* Rank Board */
router.get('/rank', function (req, res){ 


	Leaderboard.find({},['user_name','profile_img', 'total_points']).sort({total_points: -1}).exec(function(err, user){

		if (user){

			var data = user;

			var ranked = data.map(function(item, i) {
			  if (i > 0) {

				console.log(i)
				var prevItem = data[i - 1];
				if (prevItem.total_points == item.total_points) {
				item.rank = prevItem.rank;
				} else {
				item.rank = i + 1;
				}
				} else {
				item.rank = 1;
			}

			return item;
			});

		 
		   res.send({status:"true", user: data});
		}else{
			res.send({status:"failure",message: "User not found"});
		}

	})
			
	})


/* Test */
router.get('/test', function (req, res){ 
Leaderboard.find({},['user_name','profile_img', 'total_points'],function(err, user) { 
	
          

  var data = user;




 var ranked = data.map(function(item, i) {
    if (i > 0) {

    	console.log(i)
        var prevItem = data[i - 1];
        if (prevItem.total_points == item.total_points) {
            item.rank = prevItem.rank;
        } else {
            item.rank = i + 1;
        }
    } else {
        item.rank = 1;
    }
    
    return item;
});
    res.send({ranked})
			
	})
})




/* Task list*/
router.post('/taskstatus', function (req, res){ 
	
Task.find({}, function(err, tasks) {  
	if(tasks){
		    var status=[];
		    var status1=[];
	        var tasklist = tasks.map(function(item, i) {
			status.push(item);
Leaderboard.find({"user_id": req.body.user_id,"tasks.task_id":item._id},['tasks.task_status'], function(err, leaderboard) { 
			
			if(leaderboard!=""){

                    	var task_status = leaderboard[0].tasks[0].task_status;
                    	//console.log(task_status);
                    	item.set('task_status',task_status);
                    	status[0].task_status=task_status;
                    	status1.push(status)
                    	console.log(status.length)

                    	

		    }else {
					    var task_status= 'pending';	
					    //console.log(task_status);
					    item.set('task_status',task_status);
					    status[0].task_status=task_status;
					    status1.push(status)
					    //console.log(status.length)

						}
						
				});
              
           		//item.task_status="pending"
           		
					return status;
			});
		res.send({status: "true", tasklist});

	    }else{
			res.send({status: "failure", message: "failure"});		
		}
	
		});   
})

router.post('/my_next_task', function (req, res){
	User.find({"user_name":req.body.user_name},function(err, tasks) {    
			if(tasks){
			
			var data = tasks[0].accepted_task;
			var val = req.body.task_no;
			var index = data.findIndex(function(item, i){
			  return item.task_no === val
			});
			//console.log(index);

			var task = data[index+1];
			console.log(task)
			if (task != undefined){
				res.send({status: "true", task})
			}else{

				res.send({status: "false", message:"No more challanges"})

			}
            			         	
				}else {
					 res.send({status: "failure", message: "No users found"});

				}
				})


})

router.post('/my_prev_task', function (req, res){
	User.find({"user_name":req.body.user_name},function(err, tasks) {    
			if(tasks){			
			var data = tasks[0].accepted_task;
			var val = req.body.task_no;
			var index = data.findIndex(function(item, i){
			  return item.task_no === val
			});
			//console.log(index);

			var task = data[index-1];
			if (task != undefined){
				res.send({status: "true", task})
			}else{

				res.send({status: "false", message:"No more challanges"})

			}
            			         	
				}else {
					 res.send({status: "failure", message: "No users found"});

				}
	})
})






module.exports = router;