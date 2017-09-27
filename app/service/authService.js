

var httpRequest = require('request');

var config = require('../../config/config');

var User = require('../models/user');

module.exports = function (request, res) {

	var options = {
		url: 'https://api.instagram.com/oauth/access_token',
		method: 'POST',
		form: {
			client_id: config.instagram.client_id,
			client_secret: config.instagram.client_secret,
			grant_type: 'authorization_code',
			redirect_uri: config.instagram.redirect_uri,
			code: request.query.code
		}
	};
	httpRequest(options, function (error,response, body) {
		console.log(response)
		if (!error && response.statusCode == 200) {
			var r = JSON.parse(body);
			
			//console.log(user)
			var user =new User({
				id: r.user.id,
				user_name: r.user.username,
				full_name: r.user.full_name,
				bio: r.user.bio,
				website: r.user.website,
				profile_picture: r.user.profile_picture,
				access_token: r.access_token,
			

			});

			User.findOne({"user_name":r.user.username},function(err,signin){
		        if(signin) {
			                res.send(status: "true",message:"success", signin);
		                   }else{
			                     //res.send({"message":"failure"});
			                     user.save(function (error,user) {
								if (error) res.send({status: "true", message: "failure"});
								//console.log(res)
							     res.send({status: "true", user});

			})
		                   }	
	         })

			
		}
	});

};
