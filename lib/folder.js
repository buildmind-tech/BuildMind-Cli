var archiver = require('archiver');
var prompt = require('prompt');
var tmp = require('tmp');
var fs = require('fs');

var self;



var archive=function(directory_path,callback){
	console.log('Folders will be compressed before upload. Are you'.yellow)
	prompt.message = "Sure?".yellow;
	prompt.start();
	prompt.get({
		properties:{
			sure:{
				description: '[y/n]',     // Prompt displayed to the user. If not supplied name will be used.
			    type: 'string',                 // Specify the type of input to expect.
			    default: 'y',
			}
		}
	},function(err,result){
		if (err || result.sure.toLowerCase()!="y") {
			callback('stop');
		}
		else {

			tmp.file(function (err, tmp_path, fd, cleanTmp) {
			  	if (err) {
			  		throw err;
			  	}

			  	var output = fs.createWriteStream(tmp_path);
			  	var archive = archiver.create('zip', {}); // or archiver('zip', {});
				archive.pipe(output);
				archive.bulk([
				  { 
				  	expand: true, 
				  	cwd: directory_path, 
				  	src: ['*'] 
				  }
				]);
				archive.finalize();

				output.on('err',function(){
					console.log('An error occured during archiving'.red)
					callback()
				})

				output.on('close', function () {
				    console.log('Folders compressed successfully'.green)
				    if (archive.pointer()>20*1024*1024) {
				    	console.log('Uploading files larger than 20MB is unstable in command line, process canceled.'.yellow);
				    	callback();
				    }
				    else {
				    	callback(true,tmp_path,cleanTmp);
				    }				    
				    
				});

			});

			
			
		}
	})
}

self={
	archiver:archive
}

module.exports=self;