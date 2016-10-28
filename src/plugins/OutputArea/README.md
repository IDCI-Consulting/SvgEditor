OutputArea Plugin
=================

This plugin allow you to output the canvas in svg in a textarea as soon as it is rendered

First, add a textarea with the id of your choice.

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
        <div id="my-canvas-container-id">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
        <textarea id="my-output-area" rows="15" cols="50"></textarea></br>
    </body>
</html>
```

You just need to configure the plugin by updating your configuration object:

```js
...,
'output_area': {
    'enable': true,
    'texarea_id': 'my-output-area',
    'enable_textarea_edition': false
}
```
