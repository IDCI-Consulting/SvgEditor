/**
 * ColorPickerPlugin module
 */
define(
  [
    './SvgColorator'
  ],
  function (SvgColorator) {

  return class ColorPickerPlugin {

    /**
     * Constructor
     */
    constructor(canvas, editorConfig, pluginConfig) {
      this.colorPicker = document.getElementById(pluginConfig.elementId);
      this.canvas      = canvas;
    }

    /**
     * Start the plugin
     */
    start() {
      this.colorPicker.onchange = (e) => {
        let element = this.canvas.getActiveObject();
        if (element) {
          let color = '#' + e.target.value;
          SvgColorator.color(element, color);
          this.canvas.renderAll();
        }
      }
    }
  }

});
