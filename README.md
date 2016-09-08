Svg editor widget
=================

A simple editor widget to create svg.
This editor is based on fabricjs.
It is only composed of a canvas with plugins adding new features on it.

Requirements
------------

You'll need either **docker** and **docker-compose**, or **node** and **npm** along with **bower** and **gulp-cli**.

Installation
------------

### Build javascripts file with babel

If you want to build files manually, run:

```bash
bower install
npm install
npm run build
```

### Use gulp

If you want gulp to build the files automatically on file change then livereload the page, run:

```
bower install
npm install
npm install --global gulp-cli
gulp watch
```

### Use docker

The gulp watch command is always executed whenever not running.

```
docker-compose up -d
docker exec -it svgeditorwidget_app_1 npm install
docker exec -it svgeditorwidget_app_1 bower install --allow-root
```

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
        <script src="bower_components/fabric.js/dist/fabric.js"></script>
        <script data-main="lib/init" src="bower_components/requirejs/require.js"></script>
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
      constructor(canvas, editorConfig, pluginConfig) {
        this.canvas = canvas;
        this.editorConfig = editorConfig;
        this.pluginConfig = pluginConfig;
      }


      /**
       * Check if the configuration is Valid
       *
       * @param pluginConfig
       *
       * @return boolean
       */
      configurationIsValid(pluginConfig) {
        // check everything you want here

        if (typeof pluginConfig.parameter1 === 'undefined') {
          return false;
        }

        return true;
      }

      /**
       * Start the plugin
       */
      start() {
        // Your magic goes here.
        // With the editor configuration, the plugin configuration and the canvas, do whatever you want to add features on the canvas
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
      "parameter1" : "value1"
    }
  ];
});
```
