// server.js
// where your node app starts

// include the express module
var express = require('express');
// set up an express application
var app = express();
// set up ejs as a templating engine
app.set("view engine", "ejs");

// include the styles as defined in the public folder
// ! remember ejs files still need to reference the stylesheet in the head of the document
app.use(express.static('public'));

// render the homepage in the root route
// render() is a function which looks into the views folder to render ejs files
app.get('/', function(request, response) {
  response.render("homepage");
});

// render the contacts and random ejs files in their respective routes
app.get('/contacts', function(request, response) {
  response.render("contacts");
});

app.get('/random', function(request, response) {
  response.render("random");
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
