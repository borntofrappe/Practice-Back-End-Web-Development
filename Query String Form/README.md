Link to the front-end form on codepen, right [here](https://codepen.io/borntofrappe/full/yxxjmw/).
Link to the working back-end project on glitch, right [here](https://dandy-close.glitch.me/).

## Preface

Following perhaps a too big of a wait, this project sets out to once more practice with Node.js, and specifically with:

- Express, to set up a server and handle simple requests;

- ejs, to include data from a query string directly in an HTML document.

This while building a simple, straightforward application displaying a form. A form which collects some information and then displays it in a separate page when the submit button is clicked.

## Design

The project is purposed to practice with back-end development. but starting with a simple HTML structure for the form element I was inspired to go a little further in the layout of the page and actually style it a little. A little more than the default to be sure.

**Color Palette**

Without excessive research, the following colors were picked for the project:

- #E1E3EB for the background, and #4B7DFF for a random SVG element included to avoid a monotone background;

- #FFFFFF for the section of the application introducing the project;

- #F7F8FC for the form section. A slightly darker hue allows to create some separation between the different sections;

- #4B7DFF, color picked for the background SVG, is used also for the submit button;

- #363840 for the text color.

**SCSS**

Instead of using stylus, which is the preprocessor on which I rely the most, I decided to put in a small effort to code in SCSS. The design of the project is incredibly straightforward, and perhaps this is why a bit of experimentation with SCSS is welcomed.

**Page_s_**

The project actually requires two pages: one for the form, one for the page showing the values included in the form, possibly in a card.

The latter is shown _after_ the submit action has occurred, but can be designed beforehand in the same case. This also to maintain some kind of similarity, in tone and overall look between the pages, highlighting their evident connection.

You can find the HTML files making up the different pages in the _Form Structure_ folder, under `form.html` and `response.html`, for the first and second page respectively. For simplicity, they are styled through the same CSS stylesheet.

## Node

Node.js is used to render the appropriate `ejs` files and display the form's information in the response file.

**ejs**

Starting with the creation of one `ejs` file for each page, the following modifications are included with respect to the `html` files:

- the `action` attribute for the form is specified with a `submit` value. This will redirect the page toward the `/submit` path, following which the query string will provide the necessary values.


- in `response.ejs`, data is included through `<%= %>` tags. As in:

    ```ejs
    <%= data.firstName %>
    ```

    This considering a `data` object is passed with a `firstName` property.

**script.js**

Given the `ejs` file structure, the back-end code as specified in `script.js` needs to account for the following:

- create a server;

- provide the `form.ejs` file in the root path, `/`;

- provide the `response.ejs` file under the `/submit` path;

- include the data from the query string prompted after the `/submit` path. This will be in the form of something like `/submit?first-name=timothy&last-name=gerard` and so forth and so on.

It is first necessary to require a few packages:

- express, to handle the server and routing;

- ejs, to properly render `ejs` files.

```JS
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
```

This accommodates already for the simple page structure, but doesn't render the CSS stylesheet as one would have enjoyed.

This feat is achieved by serving static files, as in the `public` folder.

```JS
// render the stylesheet as a static file, through the express method `.use()`
app.use('/public', express.static(`${__dirname}/public`));
```

Afterwards, it is simply a matter of redirecting the `ejs` files toward the stylesheet.

```HTML
<link rel="stylesheet" href="../public/style.css"/>
```

This mindful of the folder's structure. `public` is indeed in the root folder, right next to the `view` folder which nests the `ejs` files.

## Closing Thoughts

The page works properly with the specified `script.js` file. This one serves the `ejs` documents in the prescribed roots. A few thoughts on this structure:

- the name of the `ejs` files may be altered to better fit the root name. Something along the lines of `index.ejs` and `submit.ejs`, or simply `confirmation.ejs`;

- `response.ejs`, or however is the file is supposed to be named, can include an anchor link element, redirecting toward the root folder for a new round of "submitting a series of required input elements" game;

- `response.ejs` can be modified to highlight the actual fields, perhaps by changing their color to the chosen blue;

- `script.ejs` might be equipped to fit a flexible query string. A query string which may or may not include some values. Something which can be included to create a more elaborate form.

- on [glitch](https://glitch.com), the only modification required by the project is the path directing toward the stylesheet. In the `ejs` files, these are simply referenced under `/style.css`.