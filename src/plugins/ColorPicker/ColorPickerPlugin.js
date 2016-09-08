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
        this.colorPicker = document.getElementById(pluginConfig.inputId);
        this.canvas      = canvas;
      }

      /**
       * Check if the configuration is valid
       *
       * @param pluginConfig
       *
       * @return boolean
       */
      configurationIsValid(pluginConfig) {
        if (typeof pluginConfig.inputId === 'undefined') {
         return false;
       }

        return true;
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
  }
);
