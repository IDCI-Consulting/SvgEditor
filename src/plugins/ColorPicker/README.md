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
        <script src="assets/fabric.min.js"></script>
        <script src="assets/jscolor.min.js"></script>
        <script data-main="lib/init" src="assets/require.js"></script>
    </head>
    <body>
        <input id="my-color-picker-id" class="jscolor" value="000000"></br>
        <div id="my-canvas-container-id">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
    </body>
</html>
```

Finally you need to configure the plugin by updating your configuration object:

```js
...,
'color_picker': {
    'enable': true,
    'input_id': 'my-color-picker-id'
}
```
