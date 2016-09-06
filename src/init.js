requirejs(['./class/SvgEditor', './class/FabricOverrider', './config/editor', './config/plugins'], function(SvgEditor, FabricOverrider, editorConfig, pluginsConfig) {
  FabricOverrider.override(fabric, editorConfig);

  var svgEditor = new SvgEditor(
    new fabric.Canvas('canvas'),
    editorConfig,
    pluginsConfig
  );

});
