ManualSave Plugin
=================

This plugin allow to manually save drawings. A save button trigger a modal which pops up and ask you for a title or to override an already save drawing. A load button allow you to choose a drawing to load among all saved drawings.

This plugin uses the bootsrap modal. You first need to add the bootsrap and jquery libraries, as well as the 2 buttons with the id of your choice.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Svg widget editor</title>
        <link rel="stylesheet" href="style.css">
        <script src="lib/utils.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="bower_components/fabric.js/dist/fabric.js"></script>
        <link rel="stylesheet" href="assets/bootstrap-modal/css/bootstrap.min.css">
        <script src="assets/bootstrap-modal/js/bootstrap.min.js"></script>
        <script data-main="lib/init" src="bower_components/requirejs/require.js"></script>
    </head>
    <body>
        <input id="my-load-modal-button-id" type="button" name="load" value="load"/>
        <input id="my-save-modal-button-id" type="button" name="save" value="save"/></br>
        <canvas id="canvas" width="300" height="300"></canvas>
    </body>
</html>
```

Finally you need to register the plugin in the config/plugin.js file just like this:

```js
...,
{
  "class": "plugins/ManualSave/ManualSavePlugin",
  "loadButtonInputId": "my-load-modal-button-id",
  "saveButtonInputId": "my-save-modal-button-id"
}
```
