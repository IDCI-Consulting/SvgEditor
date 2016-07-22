requirejs(['./class/SvgEditor', './config/config'], function(SvgEditor, config) {
  var output = document.getElementById('svg-output');
  var imageInput = document.getElementById('image-input');
  var colorPicker = document.getElementById('color-picker');

  var svgEditor = new SvgEditor(
    new fabric.Canvas('canvas'),
    output,
    imageInput,
    colorPicker,
    config
  );

  svgEditor.init();
});
