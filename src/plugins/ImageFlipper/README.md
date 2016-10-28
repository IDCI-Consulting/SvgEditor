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
        <script src="assets/fabric.min.js"></script>
        <script data-main="lib/init" src="assets/require.js"></script>
    </head>
    <body>
        <div>
            <input id="horizontalflip-modal-button" type="button" name="horizontal-flip" value="horizontal flip"/>
            <input id="verticalflip-modal-button" type="button" name="vertical-flip" value="vertical flip"/>
        </div>
        <div id="my-canvas-container-id">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
    </body>
</html>
```

Finally you need to configure the plugin by updating your configuration object:

```js
...,
'image_flipper': {
    'enable_horizontal_flip': true,
    'enable_vertical_flip': true,
    'horizontal_flip_input_id': 'horizontalflip-modal-button',
    'vertical_flip_input_id': 'verticalflip-modal-button'
},
```