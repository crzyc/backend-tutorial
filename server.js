// Load required packages
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Pokemon = require('./models/pokemon');

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({"message": 'Your pokedex is empty!'});
});

app.use('/api', router);

app.listen(port);
console.log('Insert pokemon on port ' + port);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/pokedex",{
	useNewUrlParser: true, 
	useUnifiedTopology: true,
});

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// -- New Code Below Here -- //

// Create a new route with the prefix /beers
var pokeRoute = router.route('/pokemon');

// Create endpoint /api/beers for POSTS
pokeRoute.post(function(req, res) {
  // Create a new instance of the Pokemon model
  var pokemon = new pokemon();

  // Set the beer properties that came from the POST data
  pokemon.name = req.body.name;
  pokemon.type = req.body.type;
  pokemon.quantity = req.body.quantity;

  // Save the beer and check for errors
  pokemon.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Pokemon added to the PC Box!', data: pokemon });
  });
});


