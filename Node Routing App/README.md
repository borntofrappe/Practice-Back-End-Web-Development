Link to the working project right [here](https://maddening-ceiling.glitch.me/).

## Preface

With this project I plan to practice with back-end, node development. As such, the front-end structure is dumbed down to be as simple as possible.

## Pages

Since the project is set up to handle basic routing, through express and ejs, a series of pages are set up. You can find them in the 'Pages' folder, to respectively display:

- a perennially visible navigation bar;

- a homepage;

- a contacts page;

- a four oh four page.

## Glitch

A small preface on [Glitch](https://glitch.com), the playground I will likely use for back end projects. Each node application is comes with a public, views folders for styles and HTML files.

Here are just a couple of notes I jotted down while developing the application:

- **server.js** file is the file responsible for the actual JavaScript code;

- Glitch doesn't work with CSS custom properties, so be wary of that.

## Node.js

The project makes use of the express and ejs modules to render different pages in different routes.

In `server.js`, a few simple lines handle routing:

```JS
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
```

## EJS

EJS files function much alike HTML files, rendering elements and referencing stylesheets in the head of the page.

It is a very handy view engine, helpful to include data from the URL/ response in the page itself, but for the project at hand it is simply used to render HTML elements, and also bake the navigation bar as a partial.

In `nav.ejs`:

```ejs
<!-- navigation for the simple page -->
<nav class="container__navbar">
    <a href="/">Home</a>
    <a href="/contacts">Contacts</a>
    <a href="/random">Random</a>
</nav>
```

Every other `ejs` file, in its body:

```ejs
<% include nav.ejs %>
```