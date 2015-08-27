#! /usr/bin/env node

var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;

var argv = require('minimist')(process.argv.slice(2));

if (process.argv.length==2 || argv.h || argv.help || argv._[0]=="help") {
	require('./lib/help')(argv);
}

// version
if (argv.v) {
	var version=require('./package.json').version;
	console.log("You are currently using buildmind-cli version "+version);
}

// MindDrop
if (argv._[0]=="drop") {
	require('./minddrop')(argv)
}