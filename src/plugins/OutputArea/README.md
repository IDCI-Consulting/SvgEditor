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
        <script src="bower_components/fabric.js/dist/fabric.js"></script>
        <script data-main="lib/init" src="bower_components/requirejs/require.js"></script>
    </head>
    <body>
        <canvas id="canvas" width="300" height="300"></canvas>
        <textarea id="my-output-area" rows="15" cols="50"></textarea></br>
    </body>
</html>
```

Finally you need to register the plugin in the config/plugin.js file just like this:

```js
...,
{
  "class": "plugins/OutputArea/OutputAreaPlugin",
  "texareaId": "my-output-area"
}
```
