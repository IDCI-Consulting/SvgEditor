requirejs(['./class/SvgEditor', './config/config'], function(SvgEditor, config) {
  var output = document.getElementById('svg-output');
  var svgEditor = new SvgEditor(new fabric.Canvas('canvas'), output, config);

  var rect = new fabric.Rect({
      top : 100,
      left : 100,
      width : 60,
      height : 70,
      fill : 'red'
  });

  var rect2 = new fabric.Rect({
      top : 50,
      left : 50,
      width : 50,
      height : 50,
      fill : 'blue'
  });

  svgEditor.getCanvas().on('after:render', () => { svgEditor.fillOutput() });
  svgEditor.getCanvas().add(rect, rect2);
  svgEditor.startOutputAreaListener();
});
