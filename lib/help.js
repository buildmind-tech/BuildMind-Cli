var colors = require('colors');

module.exports=function(argv){
	if (argv._.length<=1) {
		console.log(" ");
		console.log("			Welcome to BuildMind Cli!".blue);
		console.log(" ");

		console.log("  Usage: ");
		console.log(" ");
		console.log("  mind <command> [<argv>]".green );
		console.log(" ");

		console.log("  Commands: ");
		console.log(" ");

		console.log("  drop <path>".yellow+"		Upload from commandline");

		console.log(" ");
		console.log(" ");

		console.log("  'See mind help <command>'' for more detailed help")
	}
	

}