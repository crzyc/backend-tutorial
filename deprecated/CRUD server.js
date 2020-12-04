//Required dependencies/resources.
var express = require('express');
var mongoose = require('mongoose');
var Pokemon = require('./models/pokemon');
var bodyParser = require('body-parser');

//Connecting to MongoDB.
mongoose.connect('mongodb://localhost:27017/pokedex',{
	useNewUrlParser: true,
	useUnifiedTopology: true, 
});

//Creating our Express application.
var app = express();

//Use the body-parser package in the application.
app.use(bodyParser.urlencoded({extended: true}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

//Initial Dummy Route for Testing - http://localhost:3000/api
router.get('/', function(req, res){
	res.json({ message: 'You have no pokedex entries!'});
});

//Create a new route with the prefix /pokedex
var pokeRoute = router.route('/pokedex');

//Create endpoint /api/pokemon for POSTS
pokeRoute.post(function(req, res){
	var pokemon = new Pokemon();
	pokemon.name = req.body.name;
	pokemon.type = req.body.type;
	pokemon.quantity = req.body.quantity;
	
	pokemon.save(function(err){
		if(err)
			res.send(err);
		res.json({ message: 'Pokemon added to the dex!', data: pokemon });
	});
});

//Regular GET request
pokeRoute.get(function(req, res){
	Pokemon.find(function(err, pokemon){
		if(err)
			res.send(err);
		res.json(pokemon);
	});
});

//Specific ID selection for GET request
var pokeRoute = router.route('/pokedex/:pokemon_id');
pokeRoute.get(function(req, res){
	Pokemon.findById(req.params.pokemon_id, function(err, pokemon){
		if(err)
			res.send(err);
		res.json(pokemon);
	});
});

//Quantity of pokemon
pokeRoute.put(function(req,res){
	Pokemon.findById(req.params.pokemon_id, function(err,pokemon){
		if(err)
			res.send(err);
		
		pokemon.quantity = req.body.quantity;
		
		pokemon.save(function(err){
			if(err)
				res.send(err);
			res.json(pokemon);
		});
	});
});

//Delete functionality.
pokeRoute.delete(function(req,res){
	Pokemon.findByIdAndRemove(req.params.pokemon_id, function(err){
		if(err)
			res.send(err);
		res.json({ message: 'Pokemon removed from the dex!' })
	});
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
//test