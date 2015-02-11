# grunt-frontend-starter 

A sample frontend project template built with grunt and foundation. Features common frontend
utilties and easy support for layouts/partials. Modular enough to easily remove or add in anything.

- Foundation 5
- jQuery 1.11
- Modernizr
- Underscore
- Grunt task runner
- Assemble static site generator
- Compass/SCSS support
- Basic JS Constructor Plugin
- Slick Carousel
- Font Awesome
- IE8 Polyfill plugins
- Sample foundation banner template with carousel

The easiest way to get started with Grunt/Assemble. 

## Requirements

  * Ruby 1.9+
  * [Node.js](http://nodejs.org)
  * [compass](http://compass-style.org/): `gem install compass`

## Quickstart

  * Clone repo 
  * `cd` to directory and run `npm install`
  * Update package.json to reflect your project name/settings
  * Run `grunt serve` and load `http://127.0.0.1:8000` in your browser
 
All output will be compiled into the `_site` folder. So you can simply upload the entire contents to any static host.

Extra built-in options:

* `grunt` will compile your site into the "./_site" directory
* `grunt serve` will start a server at http://localhost:8000 and watch for changes
* `grunt html` will package up your site templates and minify
* `grunt clean` will delete all of the HTML files in "./_site"
* `grunt style` will convert your SASS, autoprefix, and minify your CSS
* `grunt js` will lint, concatenate, and uglify your JS.
* `grunt pub` will minify/concat files to prepare for production.
