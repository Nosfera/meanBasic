var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	//res.send('INDEX PAGE');
	// what to render
	res.render('index.html');

});

module.exports = router;