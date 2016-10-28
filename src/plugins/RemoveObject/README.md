RemoveObject Plugin
===================

This plugin allow to delete a selected object thanks to a button.

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
        <input type="button" value="delete" id="remove-object"><br/><br/>
        <div id="my-canvas-container-id">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
    </body>
</html>
```

Finally you need to configure the plugin by updating your configuration object:

```js
...,
'remove_object': {
    'enable': true,
    'input_id': 'remove-object'
},
```
