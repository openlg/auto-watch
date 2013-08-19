auto-watch
=======

##目的(Purpose)
Utilities for auto watching file trees.

自动监视目录树中文件和目录的创建、删除、改变等等事件。当添加新目录时自动给新目录及其子目录和文件添加监视任务。

##安装(Install)
<pre>
  npm install auto-watching
</pre>

###创建方式:
<pre>
	require('./watch' ).create(function(watch){
		//...处理代码
	});
	//或者
	var watch = require('./watch' ).create();
	//...处理代码
</pre>

###事件(Events):
* `create` - 创建文件或目录时触发事件。两个参数：path,stat。path:创建文件或目录的路径;stat:`fs.Stats`。
* `createfile` - 创建文件时触发的事件。两个参数：path,stat。path:创建文件的路径;stat:`fs.Stats`。
* `createdirectory` - 创建目录时触发的事件。两个参数：path,stat。path:创建目录的路径;stat:`fs.Stats`。
* `delete` - 删除文件或目录时触发事件。两个参数：path,stat。path:删除文件或目录的路径;stat:`fs.Stats`。
* `deletefile` - 删除文件时触发的事件。两个参数：path,stat。path:删除文件的路径;stat:`fs.Stats`。
* `deletedirectory` - 删除目录时触发的事件。两个参数：path,stat。path:删除目录的路径;stat:`fs.Stats`。
* `change` - 修改文件或目录时触发事件。两个参数：path,stat。path:修改文件或目录的路径;stat:`fs.Stats`。
* `changefile` - 修改文件时触发的事件。两个参数：path,stat。path:修改文件的路径;stat:`fs.Stats`。
* `changedirectory` - 修改目录时触发的事件。两个参数：path,stat。path:修改目录的路径;stat:`fs.Stats`。

###添加不需要监视目录的规则：
<pre>
	//字符串
	watch.exclude(['*index.js']);
	//正则表达式
	watch.exclude(/.*index.js$/);
	watch.exclude(new RegExp(/.*index.js$/));
	//函数
	watch.exclude(function(path){
		return path !== __filename;
	});
</pre>

###添加事件方法：
* `watch.listeners(object)` - object必须，返回scanFS对象。
<pre>
	watch.listeners({
		'create': function(path, stat){
			//...
		},
		'delete': function(path, stat){
			//...
		}
		//...
	});
</pre>
* 通过调用方法添加事件：
	`onCreate(fn)`、`onCreateFile(fn)`、`onCreateDirectory(fn)`、
	`onDelete(fn)`、`onDeleteFile(fn)`、`onDeleteDirectory(fn)`、
	`onChange(fn)`、`onChangeFile(fn)`、`onChangeDirectory(fn)`。

例子(Example)：
-----
```js
var watch = require('./watch' ).create(function(watch){

	/*watch.exclude(['*index.js']);
	 watch.exclude(/.*index.js$/);
	 watch.exclude(new RegExp(/.*index.js$/));*/

	watch.listeners({
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
	});

});

//或者

var watch = require('./watch' ).create(function(watch){

	/*watch.exclude(['*index.js']);
	 watch.exclude(/.*index.js$/);
	 watch.exclude(new RegExp(/.*index.js$/));*/

	watch.listeners({
		'createfile': function(path, stat){
			console.log('createfile:' + path, stat);
			console.log(watch.files);
		},
		'deletefile': function(path, stat){
			console.log('deletefile:' + path, stat);
			console.log(watch.files);
		},
		'changefile': function(path, stat){
			console.log('changefile:' + path, stat);
			console.log(watch.files);
		},
		'createdirectory': function(path, stat){
			console.log('createdirectory:' + path, stat);
			console.log(watch.files);
		},
		'deletedirectory': function(path, stat){
			console.log('deletedirectory:' + path, stat);
			console.log(watch.files);
		},
		'changedirectory': function(path, stat){
			console.log('changedirectory:' + path, stat);
			console.log(watch.files);
		}
	} ).watchTree(__dirname + '/test', function(err, fileCount, dirCount){
		console.log('test: ', arguments);
	});

});
```
