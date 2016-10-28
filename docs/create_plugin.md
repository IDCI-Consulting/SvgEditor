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
          if (this.config.plugin_name.enable !== 'boolean') {
            errors.push('plugin_name.enable must be defined as a boolean');
          } else {
            if (this.config.plugin_name.enable === true) {
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
        if (this.config.plugin_name.enable === true) {
            // Your magic goes here.
            // With the configuration and the canvas, do whatever you want to add features on the canvas
            // canvas is an instance of fabric.Canvas. Check the fabricjs js docs at http://fabricjs.com/docs/
        }
      }
    }
  }
);
```

Finally you just need to register your plugin in the [config/plugin.js](src/config/plugin.js) file:

```js
/**
 * Plugins configuration
 */
define(function () {
  return [
    ... // other plugins
    ,{
      "class": "path/to/your/plugin/MyAwesomePlugin",
      "priority" : "3" // optional, it can be helpful when plugin depends on other plugins and must be loaded in a specific order. 1 is a higher priority than 2. No priority is equal to 9999.
    }
  ];
});
```

You can add **default configuration to your plugin** by editing the [config/editor.js](src/config/editor.js) file.

Remember to add it also int the gulp file for the requirejs optimize task.
