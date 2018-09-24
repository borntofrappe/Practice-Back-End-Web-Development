// set up an express app
const express = require('express');
const app = express();

// require body parser
const bodyParser = require('body-parser');

// mount the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// render stylesheets through express
app.use(express.static(`${__dirname}/public`));

// set up pug as a view engine
app.set('view engine', 'pug');

// render index.pug in the root of the application
// res.render will look by default in the views folder
app.get('/', (req, res, next) => {
  res.render(`index.pug`);
});

// render response.pug in the response route
app.post('/response', (req, res, next) => {
  // retrieve the day, month and year as per the selected option elements
  let { day, month, year } = req.body;
  
  // ! be wary of the values
  // these range from 1 to 31 and from 1 to 12
  // the date object functions however with months starting from 0
  // decrement the month accordingly
  month = month - 1;
  let date = new Date(year, month, day);

  // create an array for the days of the week
  let daysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
  ];

  // create an instance of the current date object, to include a conditional based on whether the selected date is before or after the current instance
  let now = new Date();
  
  // render the pug file responsible for the response, passing the day of the week (starting from sunday) and whether the date is past relative to the current instance of the date object
  res.render('response.pug', {
    dayOfWeek: daysOfWeek[date.getDay()],
    isPast: (now > date)
  });
});

// listen on a port
const port = 3000;
app.listen(port);
console.log("listening to port 3000");