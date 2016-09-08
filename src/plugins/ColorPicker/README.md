ColorPicker Plugin
==================

This plugin allow to color the canvas svg images.

First, add the jscolor library and an input with the class **jscolor** and the id of your choice. (Check http://jscolor.com/ for more information on this lib)

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Svg widget editor</title>
        <link rel="stylesheet" href="style.css">
        <script src="lib/utils.js"></script>
        <script src="bower_components/fabric.js/dist/fabric.js"></script>
        <script src="assets/jscolor.min.js"></script>
        <script data-main="lib/init" src="bower_components/requirejs/require.js"></script>
    </head>
    <body>
        <input id="my-color-picker-id" class="jscolor" value="000000"></br>
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

Finally you need to register the plugin in the config/plugin.js file just like this:

```js
...,
{
  "class": "plugins/ColorPicker/ColorPickerPlugin",
  "inputId": "my-color-picker-id"
}
```

Now, you can select svg object in the fabric canvas, and color them with the color picker.
