#!/usr/bin/env node

var mpath = process.argv.slice(2);

if(mpath && mpath.length >0 ) {
	var watch = require('./watch' ).create(function(watch){

		/*watch.exclude(['*index.js']);
		 watch.exclude(/.*index.js$/);
		 watch.exclude(new RegExp(/.*index.js$/));*/

		/*watch.listeners({
			'create': function(path, stat){
				console.log('create:' + path, stat);
			},
			'delete': function(path, stat){
				console.log('delete:' + path, stat);
			},
			'change': function(path, stat){
				console.log('change:' + path, stat);
			}
		}).watchTree(__dirname + '/test', function(err, fileCount, dirCount){
				console.log('test: ', arguments);
			});*/

		watch.listeners({
			'createfile': function(path, stat){
				console.log('createfile:' + path, stat);
			},
			'deletefile': function(path, stat){
				console.log('deletefile:' + path, stat);
			},
			'changefile': function(path, stat){
				console.log('changefile:' + path, stat);
			},
			'createdirectory': function(path, stat){
				console.log('createdirectory:' + path, stat);
			},
			'deletedirectory': function(path, stat){
				console.log('deletedirectory:' + path, stat);
			},
			'changedirectory': function(path, stat){
				console.log('changedirectory:' + path, stat);
			}
		} ).watchTree(mpath[0], function(err, fileCount, dirCount){
				console.log('当前监视文件: ', arguments);
				console.log(Object.keys(watch.files));
			});

	});
} else {
	console.log('Usage: ./testWatch.js dirname');
}
