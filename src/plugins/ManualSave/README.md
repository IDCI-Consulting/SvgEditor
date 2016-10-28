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
        <script src="assets/jquery.min.js"></script>
        <script src="assets/fabric.min.js"></script>
        <link rel="stylesheet" href="assets/bootstrap-modal/css/bootstrap.min.css">
        <script src="assets/bootstrap-modal/js/bootstrap.min.js"></script>
        <script data-main="lib/init" src="assets/require.js"></script>
    </head>
    <body>
        <input id="my-load-modal-button-id" type="button" name="load" value="load"/>
        <input id="my-save-modal-button-id" type="button" name="save" value="save"/></br>
        <div id="my-canvas-container-id">
            <canvas id="canvas" width="300" height="300"></canvas>
        </div>
    </body>
</html>
```

You just need to configure the plugin by updating your configuration object:

```js
...,
'manual_save': {
    'enable': true,
    'load_button_input_id': 'my-load-modal-button-id',
    'save_button_input_d': 'my-save-modal-button-id',
    'labels': {
        'save': 'Save',
        'save_this_project': 'Save this drawing',
        'new_save': 'New save',
        'override_save': 'Override',
        'no_save_already': 'No save already',
        'new_save_placeholder': 'Your title goes here...',
        'load_project': 'Load a drawing',
        'nothing_to_load': 'No drawings to load',
        'load': 'Load',
        'close': 'Close',
        'title_already_used': 'This title is already used',
        'title_not_blank': 'The title must be filled',
        'delete': 'Delete'
    }
},
```
