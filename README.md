# Gulp Tasks

Because the `gulpfile.js` was becoming enormous and because I hate huge files, this
directory contains all the gulp tasks splited by purposes. `gulpfiles.js` passes path
configuration to gulp tasks through `gulp.paths`.

### Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files

## build.js

Contains the build tasks aiming to optimize all your project and create the dist folder
- **partials**: compile html partials in one javascript `templateCacheHtml.js`
- **html**: the big one with `useref`, `rev` and `uglify`.
- **images**: optimize images with imagemin.
- **fonts**: copy fonts from bower to dist
- **misc**: copy other files
- **clean**: delete temporary files
- **build**: html + images + fonts + misc

## e2e-tests.js

Task for launching e2e tests from Gulp. Which means launching local server,
an instance of Selenium and Protractor.

## inject.js

Inject task which link project files in the `index.html` and write the result in `.tmp/serve/index.html`
- Project CSS files
- Project JS files
- Bower css and js deps

**Warning** The `src/index.html` is not modified (it was the case in previous version and is still the case in other generators) but the injected `index.html` is placed in `.tmp/serve`.

## markups.js

Compile your markups files (when you use a HTML preprocessor).

## proxy.js

Optional implementation of a proxy which ables to address your backend server through BrowserSync (and avoir CORS).

## scripts.js

Compile your scripts with your JS preprocessor if you have one. Run the linter. If you use ES6, will also use Browserify to bundle the files.

## server.js

Gulp tasks which start a server for development or e2e tests.

## styles.js

Compile your styles with your CSS preprocessor. Use injection in the index.*

## tsd.js

Typescript specific tasks to generate Typescript descriptors.

## unit-tests.js

Task for launching the unit tests with Karma from Gulp.

## watch.js

Watch task which watch over source files to trigger recompilation.
