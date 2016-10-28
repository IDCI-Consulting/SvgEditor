Svg editor widget
=================

A simple editor widget to create svg composed images. [Check out the live demo](https://idci-consulting.github.io/SvgEditor/).
This editor is based on [fabricjs](https://github.com/kangax/fabric.js/). It is merely composed of a canvas with plugins adding new features on it.

Dev environment requirements
----------------------------

You'll need either **docker** and **docker-compose**, or **node** and **npm** along with **gulp-cli**.

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

Usage
-----

### Minimal setup

Here is the minimal html you need to get the editor working.
You **must** create a configuration object whose name is defined with the **data-configuration-variable** attribute:

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Svg widget editor</title>
        <link rel="stylesheet" href="style.css">
        <script src="lib/utils.js"></script>
        <script src="assets/fabric.min.js"></script>
        <script data-main="lib/init" src="assets/require.js" data-configuration-variable="idciSvgEditorConfig"></script>
        <script type="text/javascript">
            var idciSvgEditorConfig = {
                'canvas_id': 'canvas',
                'canvas_container_id': 'canvas-container'
                // ... every parameters you want to add
            };
        </script>
    </head>
    <body>
        <div id="canvas-container">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
    </body>
</html>
```

Without plugins, this editor is not really useful... Check any of the plugins in the `plugins\` directory.
Read plugins documentation for more details on how to install and configure them.
If you want all plugins available and installed right away, just clone the project and start it as it is.

### Use fabricjs on editor ready

You can use the fabricjs canvas object once the editor is loaded by adding a function whose name is specified with the **data-editor-ready-function** attribute, on the script that load requirejs. Let's say you want to hide a button when no object is selected:

```
<script type="text/javascript"
    data-main="src/init"
    data-configuration-variable="idciSvgEditorConfig"
    data-editor-ready-function="editorReady"
    src="assets/require.js">
</script>
<script type="text/javascript">
function editorReady(canvas) {
    var myButton = getElementById('button');
    canvas.on('selection:cleared', function() {
        myButton.style.display = 'none';
    });
    canvas.on('object:selected', function() {
        myButton.style.display = 'block';
    });
}
</script>
```

Plugin reference
----------------

**All plugins are disabled by default**

* [ImageFlipperPlugin](src/plugins/ImageFlipper/README.md): Flip images vertically or horizontally
* [ImageLoaderPlugin](src/plugins/ImageLoader/README.md): Load images to the canvas thanks to a file input
* [ManualSavePlugin](src/plugins/ManualSave/README.md): Display a modal that will be used to load or save the canvas (in local storage but it can be easily extended)
* [AutoSavePlugin](src/plugins/AutoSave/README.md): Automatically save the plugin each time the canvas is rendered (in local storage but it can be easily extended)
* [ObjectResizerPlugin](src/plugins/ObjectResizer/README.md): Resize the canvas objects. Used only to add 'responsivness' to the canvas
* [ColorPickerPlugin](src/plugins/ColorPicker/README.md)ColorPickerPlugin: Color a selected svg in the canvas thank to the [jscolor picker](http://jscolor.com/)
* [OutputAreaPlugin](src/plugins/OutputArea/README.md): Output the final svg in a textarea
* [KeyboardListenerPlugin](src/plugins/KeyboardListener/README.md): Add features to the canvas to move/delete selected objects with the keyboard
* [ImageDragAndDropPlugin](src/plugins/ImageDragAndDrop/README.md): Drag and drop images to the canvas
* [AutoImageResizerPlugin](src/plugins/AutoImageResizer/README.md): Automatically resize images when they are bigger than the canvas
* [RemoveObjectPlugin](src/plugins/RemoveObject/README.md): Delete selected object thank to a button

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
      "class": "path/to/your/plugin/MyAwesomePlugin
      "priority" : "3" // optional, it can be helpful when plugin depends on other plugins and must be loaded in a specific order
    }
  ];
});
```

You can add **default configuration to your plugin** by editing the config/editor.js file.

Remember to add it also int the gulp file for the requirejs optimize task.