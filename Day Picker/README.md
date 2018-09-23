# Node Day Picker

<!-- Link to the working glitch right [here](). -->

## Preface

With this project I plan to practice with back-end, node development. Specifically, I plan to practice with the following dependencies:

- express, to manage the server and basic routing;

- pug, as a templating language;

- body-parser, to interpret the date from a simple form.

The project itself is rather silly, but nevertheless a good pretext to create a small application:

- select a day, month and year, from three different inputs;

- request the actual day of the week matching the defined fields.

It is something that can be implemented rather easily on the front-end, without any routing whatsoever and by including simple _onChange_ listeners on the input elements. As a matter of fact, it'd be intriguing to replicate the application without node, with a simple HTML, CSS and JS environment.

## Pug

Instead of leveraging **ejs**, I decided to pick up [**pug**](https://pugjs.org) as a templating language. The following insights were gained while developing the simple application.

### Setup

Simply by typing the emmet shortcut `!` in a file with the `.pug` extension it is already possible to begin developing with a basic, rather helpful framework.

```pug
<!DOCTYPE html>
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    meta(http-equiv="X-UA-Compatible", content="ie=edge")
    title Document
  body
```

Based on this snippet:

- pug seems to be based entirely on _indentation_; Nested elements are simply indented with respect to the parent element, and sibling ones are indented on the same level;

- beside the declaration of the document type, there is no need to include `<`tags`>` when including syntax later rendered into HTML.

### HTML Elements

Elements are included without wrapping tags and with a not-too-foreign syntax. Here's a few lessons learned while creating the pug logic for the simple application:

- elements are included simply by detailing their tag-less name.

  ```pug
  body
    p
  ```

- text is included directly following the element declaration.

  ```pug
    body
      p this is a paragraph
  ```

- classes are included following a `.` dot on an HTML element.

  ```pug
  body
    h1.title
    p.description
  ```

  This is similar to how Emmet itself introduces HTML syntax. or simply how you reference the elements in a CSS stylesheet.

- attributes are included in (parens), with multiple arguments simply wrapped within the same (brackets), and specified one line at a time.

  ```pug
    body
      h1.title
      p.description
      img(
        src='url'
        alt='nice looking url'
      )
  ```

- comments are included following two forward-slash characters: `//`. On the basis of indentation, it is possible to include multi line comments one level inside the mentioned slashes.

  ```pug
  // single line comment

  //
    multi
    line 
    comment 
  ```

  Such comments are rendered to HTML comments, while two forward-slash characters followed by a hyphen: `//-` are not rendered, not even to HTML comments. They serve their purpose in the development of the pug document.

### Templating Engine

Beside the mentioned elements, and perhaps this is exactly the purpose of the templating language, pug can introduce JavaScript logic directly between HTML elements.

The following pointers may help, especially for posterity:

- to include variables, detail the `var` keyword, preceded by a hyphen and then functioning exactly like in plain old JavaScript:

  ```pug
  - var name = 'jonny';
  - var age = 21;
  ```

  Remember to include strings within quotes.

  To later use the variables, the syntax differentiates itself depending on whether the name needs interpolating. In attributes for instance, the variable can be used directly:

  ```pug
  -var name = 'jonny';
  img(
    src='url'
    alt=name
  )
  ```

  As text, the variable needs to be wrapped in between {curly brackets}, preceded by a pound # character:

  ```pug
  -var name = 'jonny';
  h1 #{name}
  ```

- beside variables, it is possible to benefit from conditionals and loops. Simply include the JavaScript logic and indent the syntax benefiting from the logic one level deeper:

  ```pug
  - var age = 21;
  if age < 18
    h1 access not granted
  else
    h1 access granted
  ```

## Node

In the `script.js` file, the server is set up through the `express` package.

```JS
// set up an express app
const express = require('express');
const app = express();

/* APP LOGIC RIGHT HERE */

// listen on a port
const port = 3000;
app.listen(port);
console.log("listening to port 3000");
```

In between the mentioned code, express handles routing through simple `.get()` and `.post()` methods. It is however necessary, as to handle the form element, to include the `body-parser` package.

```JS
// require body parser
const bodyParser = require('body-parser');

// mount the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
```

This will later allow to obtain information pertaining a form element sent through a POST request, simply referring to `req.body`.

The routes than render the different `pug` files. In the `post` route, the JavaScript file considers the data from then form and then spits out the information templated in the `response.pug` file.

## Glitch

Just a small note here: remember that [Glitch]() does not support CSS pseudo properties. You need to remove these variables and include the values for the colors, fonts directly.
