
ImageFlipper Plugin
==================

This plugin allow to flip the canvas svg images.

First add inputs with the the ids of your choice.

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
        <div>
            <input id="horizontalflip-modal-button" type="button" name="horizontal-flip" value="horizontal flip"/>
            <input id="verticalflip-modal-button" type="button" name="vertical-flip" value="vertical flip"/>
        </div>
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

Finally you need to register the plugin in the config/plugin.js file just like this:

```js
...,
,{
  "class": "plugins/ImageFlipper/ImageFlipperPlugin",
  "horizontalFlipInputId": "horizontalflip-modal-button",
  "verticalFlipInputId": "verticalflip-modal-button"
}
```

Now, you can select object in the fabric canvas, and flip them the way you want.
