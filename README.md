# BuildMind-Cli  [![Build Status](https://travis-ci.org/buildmind-tech/BuildMind-Cli.svg?branch=master)](https://travis-ci.org/buildmind-tech/BuildMind-Cli)
Command line tools for accessing buildmind products.

## Install
You need npm for this, simply

    npm install buildmind-cli -g

Do use `-g` because buildmind-cli doesn't bring you any help in your node projects.

## Screen shots
![alt text](https://bu.ildm.in/d/images/buildmind-cli.png "BuildMind-Cli")

## Use MindDrop

Currently you can upload from BuildMind Cli to MindDrop

Simply use

`mind drop <path>`

And you will be promt for your username and password, done!

![alt text](https://bu.ildm.in/d/images/buildmind-cli-drop.png "BuildMind-Cli")

Folders are going to be compressed before upload.

![alt text](https://bu.ildm.in/d/images/buildmind-cli-drop-folder.png "BuildMind-Cli")

## Development

This product is currently in alpha phase, please clone and run

`npm install`

to install the dependencies. Then run

`npm link`

to make it as a service locally. Then you can use the commands properly.


