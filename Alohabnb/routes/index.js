var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const bcrypt = require('bcryptjs')

var monk = require('monk');
const { response } = require('express');
var db = monk('127.0.0.1:27017/alohabnb');
var collection = db.get('users');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express'} );
});

router.get('/login', function(req, res) {
	res.render('login');

});

router.get('/register', function(req, res) {
	res.render('register');

});

router.get('/favorites', function(req, res) {
	res.render('favorites');

});

//protected route
// router.get('/welcome', auth, function(req, res) {
// 	res.json({ message: "Welcome!!" } );

// });

router.get('/welcome', function(req, res) {
	res.render('welcome');

});
// get properties
router.get('/properties2', function(req, res) {
	var collection = db.get('properties');
	if (req.query.pid === undefined){
		collection.find({}, function(err, properties){
			if (err) throw err;
			res.json(properties);
		});
	}
	else{
		collection.findOne({ pid: Number(req.query.pid) }, function(err, property){
			if (err) throw err;
			res.json(property);
		});
	}
});
//get users
router.get('/users', function(req, res) {
	var collection = db.get('users');
	if (req.query.uid === undefined){
		collection.find({}, function(err, user){
			if (err) throw err;
			res.json(user);
		});
	}
	else{
		collection.findOne({ uid: Number(req.query.uid) }, function(err, user){
			if (err) throw err;
			res.json(user);
		});
	}
});
// get login user
router.get('/login_user', function(req, res) {
	res.json({
		uid: 2,
		favorite_list: [1, 2]
	});
});
//get test
// get properties
router.get('/test', function(req, res) {
	var collection = db.get('test');
	if (req.query.pid === undefined){
		collection.find({}, function(err, test){
			if (err) throw err;
			res.json(test);
		});
	}
	else{
		collection.findOne({ pid: Number(req.query.pid) }, function(err, test){
			if (err) throw err;
			res.json(test);
		});
	}
});


router.post('/register', function(req, res) {
	
	const {username, email, password } = req.body;

	if(!(username && email && password)){

		res.json( { error: "All fields are required!" } );
	}
	else{

		collection.findOne({ email: email }, function(err, user){
			if (err) throw err;

			if (user){
				res.json({ error : "User already exists. Please login!"} );

			}
			else if (!email.match(/^\S+@[0-9a-zA-Z]+.[0-9a-zA-Z]+$/)){
				res.json({ error : "Please enter a valid email!"} );
			}
			else if (password.length < 6){
				res.json({ error : "Please enter a stronger password!"} );
			}
			else{
				var hash = bcrypt.hashSync(password, 10);
				let newUser = {
					uid: 6,
					username: username,
					is_host: false,
					owned_properties: [],
					favorite_list: [],
					password: hash,
					email: email
				}
				
				collection.insert(newUser, function(err, user){
					
          			if (err) throw err;
					var token = jwt.sign({ user_id: user._id, email}, 'secretkey');

					if (token){
						user.token = token;

					}
					res.json(user);

				})


			}


		});	

	}



});

router.post('/login', function(req, res) {
	const {username, password } = req.body;

	if(!(username && password)){

		res.json({ error: "All fields are required!" } );
	}
	else{

		collection.findOne({ username: username }, function(err, user){
			if (err) throw err;
			if(user == null){

				res.json({ error: "User doesn't exist" } );

			}
			else{
				if (bcrypt.compareSync(password, user.password) ){
					var token = jwt.sign({ user_id: user._id, username}, 'secretkey');
					user.token = token;
					res.json(user);

				}
				else{
					res.json( {error: "Username or password is incorrect!" } );

				}

			}

		});

	}

});




module.exports = router;
