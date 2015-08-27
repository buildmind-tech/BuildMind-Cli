var prompt = require('prompt');
var request = require('request');

var self;

var check=function(callback){
	prompt.message = "Authentication".green;
	prompt.start();
	prompt.get({
		properties: {
			userinfo:{
			    description: 'BuildMind Username or Email',     // Prompt displayed to the user. If not supplied name will be used.
			    type: 'string',                 // Specify the type of input to expect.
			    message: 'Password must be letters', // Warning message to display if validation fails.
			    required: true                        // If true, value entered must be non-empty.
			}, 
			password:{
				description: 'BuildMind Password',     // Prompt displayed to the user. If not supplied name will be used.
			    type: 'string',                 // Specify the type of input to expect.
			    message: 'Password must be letters', // Warning message to display if validation fails.
			    required: true,                        // If true, value entered must be non-empty.
			    hidden:true
			}
		}
	}, function (err, result) {
	//
	// Log the results.
	//
		// console.log('Command-line input received:');
		// console.log('  username: ' + result.userinfo);
		// console.log('  password: ' + result.password);
		request.post({
			url:'http://drop.buildmind.org/login',
			form:result
		},function (err, res, body) {
			if (err){
				console.log(err);
			}

			if (res.statusCode==200) {
				console.log('Auth  Successfully');
				body=JSON.parse(body);
				callback(err,body);
			}
			else {
				console.log('Auth Failed');
			}
		});



		

	});

	
}

self={
	check:check
}

module.exports=self;