/**
 * ImageFlipperPlugin module
 */
define(
  function () {
    return class ImageFlipperPlugin {

      /**
       * Constructor
       *
       * @param canvas : a fabric.Canvas() object
       * @param editorConfig : the configuration from the config/editor.js file
       * @param pluginConfig : the configuration from the config/plugin.js file
       */
      constructor(canvas, editorConfig, pluginConfig) {
        this.canvas = canvas;
        this.editorConfig = editorConfig;
        this.pluginConfig = pluginConfig;

        this.horizontalInput = document.getElementById(pluginConfig.horizontalFlipInputId);
        this.verticalInput = document.getElementById(pluginConfig.verticalFlipInputId);
      }

      /**
       * Check if the configuration is Valid
       *
       * @param pluginConfig
       *
       * @return boolean
       */
      configurationIsValid(pluginConfig) {
        // check everything you want here

        if (typeof pluginConfig.horizontalFlipInputId === 'undefined') {
          return false;
        } else if (typeof pluginConfig.verticalFlipInputId === 'undefined') {
          return false;
        }

        return true;
      }

      /**
       * Start the plugin
       */
      start() {
        this.horizontalInput.onclick = () => {
          if (null !== this.canvas.getActiveObject()) {
            if (this.canvas.getActiveObject().get('flipX')) {
              this.canvas.getActiveObject().set('flipX', false);
            } else {
              this.canvas.getActiveObject().set('flipX', true);
            }

            this.canvas.renderAll();
            }
        }

        this.verticalInput.onclick = () => {
          if (null !== this.canvas.getActiveObject()) {
            if (this.canvas.getActiveObject().get('flipY')) {
              this.canvas.getActiveObject().set('flipY', false);
            } else {
              this.canvas.getActiveObject().set('flipY', true);
            }

            this.canvas.renderAll();
          }
        }
      }
    }
  }
);

