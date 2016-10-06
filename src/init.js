requirejs(['./class/SvgEditor', './config/plugins'], function(SvgEditor, pluginsConfig) {

  let svgEditor = new SvgEditor(
    new fabric.Canvas('canvas'),
    tmsSvgEditorConfig,
    pluginsConfig
  );

});
