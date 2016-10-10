ImageDragAndDropper Plugin
==========================

This plugin allow to drag and drop images to the canvas.

First, add a container to the canvas and another one which will include all your images.

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
        <body>
        <div id="my-image-container-id">
          <img src="assets/svg/cat.svg" width="50">
          <img src="assets/svg/dog.png" width="50">
        </div>
        <div id="my-canvas-container-id">
          <canvas id="canvas" width="300" height="300"></canvas>
        </div>
    </body>
</html>
```

Finally you need to register the plugin in the config/plugin.js file just like this:

```js
...,
{
  "class": "plugins/ImageDragAndDropper/ImageDragAndDropperPlugin",
  "imageContainerId": "my-image-container-id",
  "canvasContainerId": "my-canvas-container-id"
}
```

Now, you can drag and drop the images in the container into the fabric canvas.
