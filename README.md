Svg editor
==========

A simple editor widget to create svg composed images. [Check out the live demo](https://idci-consulting.github.io/SvgEditor/).
This editor is based on [fabricjs](https://github.com/kangax/fabric.js/). It is merely composed of a canvas with plugins adding new features on it.

Getting started
---------------

This svg editor must run in a browser that support es6. If not, use [gulp](http://gulpjs.com/) to build the javascript file with babel (gulp build task).
You'll need either **docker** and **docker-compose**, or **node** and **npm** along with **gulp-cli**.
The gulp build command create a **lib/** directory with built scripts in it. You must update the data-main attribute of the requirejs script with the right path of your script.

### With docker

Run the following command:

```
docker-compose up -d && docker exec -it svgeditor_app_1 npm install
```

Then browse [http://localhost:8030](http://localhost:8030).

### On your own setup

```
npm install
npm install --global gulp-cli
```

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
        <script src="src/utils.js"></script>
        <script src="assets/fabric.min.js"></script>
        <script data-main="src/init" src="assets/require.js" data-configuration-variable="idciSvgEditorConfig"></script>
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

```html
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
* [ObjectResizerPlugin](src/plugins/ObjectResizer/README.md): Resize the canvas objects. Used only to add 'responsivness' to the canvas
* [ColorPickerPlugin](src/plugins/ColorPicker/README.md)ColorPickerPlugin: Color a selected svg in the canvas thank to the [jscolor picker](http://jscolor.com/)
* [OutputAreaPlugin](src/plugins/OutputArea/README.md): Output the final svg in a textarea
* [KeyboardListenerPlugin](src/plugins/KeyboardListener/README.md): Add features to the canvas to move/delete selected objects with the keyboard
* [ImageDragAndDropPlugin](src/plugins/ImageDragAndDrop/README.md): Drag and drop images to the canvas
* [AutoImageResizerPlugin](src/plugins/AutoImageResizer/README.md): Automatically resize images when they are bigger than the canvas
* [RemoveObjectPlugin](src/plugins/RemoveObject/README.md): Delete selected object thank to a button
* [ManualSavePlugin](src/plugins/ManualSave/README.md): Display a modal that will be used to load / save the canvas in local storage
* [AutoSavePlugin](src/plugins/AutoSave/README.md): Automatically save the plugin each time the canvas is rendered in local storage

Improve the editor
------------------

See how to:

* [Create a plugin](docs/create_plugin.md) to add features to the canvas
* Add a new persistence manager to save data wherever you want (TODO)