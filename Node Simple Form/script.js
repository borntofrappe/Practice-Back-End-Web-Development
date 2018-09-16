// specify the port of localhost
const port = 3000;

// set up a server
// require the package
// ! remember to install the package and have it listed in package.json
const express = require('express');
// set up an express app
const app = express();


// set ejs as a view engine
// ! remember to install the package and have it listed in package.json
app.set('view engine', 'ejs');

// render the stylesheet as a static file, through the express method `.use()`
app.use('/public', express.static(`${__dirname}/public`));

// serve form.ejs on the root folder, without any additional data
app.get('/', (req, res) => {
    res.render('form.ejs');
});

// serve response.eje on the /submit folder, with the additional data provided by the query string
app.get('/submit', (req, res) => {
    let query = req.query;
    res.render('response.ejs', { data: query });
});

// listen to the server on the specified port
app.listen(port);
