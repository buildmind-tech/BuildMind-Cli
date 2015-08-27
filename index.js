#! /usr/bin/env node

var path = require('path'),
    fs = require('fs'),
    exec = require('child_process').exec;

var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);


// version
if (argv.v) {
	var version=require('./package.json').version;
	console.log("You are currently using buildmind-cli version "+version);
}

// MindDrop
if (argv._[0]=="drop") {
	require('./minddrop')(argv)
}