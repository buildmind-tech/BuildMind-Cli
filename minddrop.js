var fs=require('fs');
var request = require('request');

var auth=require('./lib/auth');
var folder=require('./lib/folder')


var uploadFile=function(path,authData,cleanTmp){
	console.log(('Uploading using user '+authData.username).green);
	console.log('Start uploading now'.green);
	var req=request.post({
		url:'http://drop.buildmind.org/upload',
		form: form
	},function (err, res, body) {
		if (err){
			console.log(err);
		}

		if (res.statusCode==200) {
			console.log('Upload Successfully');
			if (cleanTmp) {
				cleanTmp();
			}
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
	    	folder.archiver(file_path,function(complete,tmp_path,cleanTmp){
	    		if (complete==true){
	    			auth.check(function(err,authData){
			    		uploadFile(tmp_path,authData,cleanTmp);
			    	})		    			
	    		}
	    		else {
	    			console.log('MindDrop doesn\'t support uploading unzipped folders')
	    			return;
	    		}

	    		
	    	})
	        
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