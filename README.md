Svg editor widget
=================

A simple editor widget to create svg composed images. [Check out the live demo](https://idci-consulting.github.io/SvgEditor/).
This editor is based on [fabricjs](https://github.com/kangax/fabric.js/). It is merely composed of a canvas with plugins adding new features on it.

Requirements
------------

You'll need either **docker** and **docker-compose**, or **node** and **npm** along with **gulp-cli**.

Installation
------------

### On your own setup

```
npm install
npm install --global gulp-cli
gulp watch
```

### Dockerized

The gulp watch command is always executed whenever not running.

```
docker-compose up -d
docker exec -it svgeditorwidget_app_1 npm install
```

This will create a lib/ directory with built scripts in it.

### Build

If you want a single minified file, run **gulp build**. It will create the dist/svg-editor.min.js file.
If you want to add new plugins, edit the gulpfile at line 49 accordingly to tell the requirejs optimizer to include them.

Basic editor
------------

here is the minimal html you need to get the editor working:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Svg widget editor</title>
        <link rel="stylesheet" href="style.css">
        <script src="lib/utils.js"></script>
        <script src="assets/fabric.min.js"></script>
        <script data-main="lib/init" src="assets/require.js"></script>
    </head>
    <body>
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

Without plugins, this editor is not really useful... Check any of the plugins in the `plugins\` directory. Read plugins documentation for more details on how to install them. If you want all plugins available and installed right away, just clone the project and start it as it is.

Creating a plugin
------------------

Here is the skeleton of a plugin. You need to wrap it by the requirejs define function so it can be loaded by the editor.

```js
/**
 * MyAwesomePlugin module
 */
define(
  function () {

    return class MyAwesomePlugin {

      /**
       * Constructor
       *
       * @param canvas : a fabric.Canvas() object
       * @param editorConfig : the configuration from the config/editor.js file
       * @param pluginConfig : the configuration from the config/plugin.js file
       */
      constructor(canvas, editorConfig) {
        this.canvas = canvas;
        this.config = editorConfig;
      }

      /**
       * Get the configuration errors
       * this function is used to check if the configuration is valid before the start() function is ran
       *
       * @return array
       */
      getConfigurationErrors() {
        let errors = [];

        if (typeof this.config.plugin_name === 'undefined') {
          errors.push('plugin_name must be defined');
        } else {
          if (this.config.image_loader.enable !== 'boolean') {
            errors.push('plugin_name.enable must be defined as a boolean');
          } else {
            if (this.config.image_loader.enable === true) {
             ... //additional configuration
            }
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.config.image_loader.enable === true) {
            // Your magic goes here.
            // With the configuration and the canvas, do whatever you want to add features on the canvas
        }
      }
    }
  }
);
```

Finally you just need to register your plugin in the configuration:

```js
/**
 * Plugins configuration
 */
define(function () {
  return [
    ... // other plugins
    ,{
      "class": "path/to/your/plugin/MyAwesomePlugin",
      "priority" : "3" // optional, it can be helpfull when plugin have dependency b
    }
  ];
});
```

Remember to add it also int the gulp file for the requirejs optimize task.