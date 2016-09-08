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
        <script src="bower_components/fabric.js/dist/fabric.js"></script>
        <script data-main="lib/init" src="bower_components/requirejs/require.js"></script>
    </head>
    <body>
        <input id="my-image-loader-id" type="file" name="picture"/></br>
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

Finally you need to register the plugin in the config/plugin.js file just like this:

```js
...,
{
  "class": "plugins/ImageLoader/ImageLoaderPlugin",
  "fileInputId": "my-image-loader-id"
}
```

Now, you can load images into the fabric canvas.
