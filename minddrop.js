var fs=require('fs');
var request = require('request');

var auth=require('./auth');

var uploadFile=function(path,authData){


	// var form = {
	//   // // Pass a simple key-value pair
	//   // my_field: 'my_value',
	//   // // Pass data via Buffers
	//   // my_buffer: new Buffer([1, 2, 3]),
	//   // Pass data via Streams
	//   // file: fs.createReadStream(path),
	//   // Pass multiple values /w an Array
	//   // attachments: [
	//   //   fs.createReadStream(__dirname + '/attachment1.jpg'),
	//   //   fs.createReadStream(__dirname + '/attachment2.jpg')
	//   // ],
	//   // Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
	//   // Use case: for some types of streams, you'll need to provide "file"-related information manually.
	//   // See the `form-data` README for more information about options: https://github.com/felixge/node-form-data
	//   file: {
	//     value:  fs.createReadStream(path),
	//     options: {
	//       filename: '',
	//       contentType: 'image/jpg'
	//     }
	//   },
	//   data:auth
	// };

	console.log('uploading using user '+authData.username);

	var req=request.post({
		url:'http://drop.buildmind.org/upload',
		form: form
	},function (err, res, body) {
		if (err){
			console.log(err);
		}

		if (res.statusCode==200) {
			console.log('Upload Successfully')
		}
		else {
			console.log('Upload Failed');
		}
	});

	var form=req.form();
	form.append('file', fs.createReadStream(path),{filename: 'test.jpg'});
	form.append('data', JSON.stringify(authData));
	
}

module.exports=function(argv){
	var file_path=argv._[1];
	
	if (!file_path) {
		console.log('You should specify a file path to drop.')
		return;
	}

	// try {
	    // Query the entry
	    stats = fs.lstatSync(file_path);



	    // Is it a directory?
	    if (stats.isDirectory()) {
	        console.log('you want to upload folder from '+file_path);
	    }
	    else {
	    	console.log('You are uploading the file : '+file_path);
	    	auth.check(function(err,authData){
	    		uploadFile(file_path,authData);
	    	})	    	
	    }
	// }
	// catch (e) {
	// 	console.log(e);
	//     console.log('the file path you give is not valid or unreachable')
	// }
}