var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
// db , collection 

//db mylist
//collection tasks
var dbName = "mylist";
var dbCollection = "tasks"
var dblocal = "http://localhost:27017"

var db = mongojs('list:1234@localhost:27017/', ['tasks'],{ ssl: true });
db.on('error', function (err) {
    console.log('database error', err)
})
 
db.on('connect', function () {
    console.log('database connected')
})

/*router.get('/tasks', function(req, res, next){
	res.send('TASK API');

});
*/

//get All tasks
router.get ('/tasks', function(req, res, next){
	//res.send('TASK API');
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});

});

//get Single tasks
router.get ('/tasks/:id', function(req, res, next){
	//res.send('TASK API');
	// condition on {}
	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});

});

// save task -> post request
router.post('/task', function(req,res, next){
	var task = req.body;
	if(!task.title || (task.isDone + '')){
		res.status(400);
		res.json({
				"error": "Bad Data"
		});
	}else{
		db.tasks.save(task, function(err,task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
		}
	});

//DELETE Single tasks
router.delete ('/tasks/:id', function(req, res, next){
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});

});

//UPDATE Single tasks
router.put ('/tasks/:id', function(req, res, next){
	var task = req.body;
	var updTask = {};

	if(task.idDone){
		updTask.isDone = task.isDone;
	}
	if(task.title){
		updTask.title = task.title;
	}

	if(!updTask){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	} else {
		db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updTask,{}, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}

});
module.exports= router;