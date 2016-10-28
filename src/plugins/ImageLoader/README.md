ImageLoader Plugin
==================

This plugin allow you to load images to the canvas thanks to a file input.

First, add a file input with the id of your choice.

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
        <input id="my-image-loader-id" type="file" name="picture"/></br>
        <div id="my-canvas-container-id">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
    </body>
</html>
```

Finally you need to configure the plugin by updating your configuration object:

```js
...,
{
  "class": "plugins/ImageLoader/ImageLoaderPlugin",
  "fileInputId": "my-image-loader-id"
}
```