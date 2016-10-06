/**
 * KeyboardListenerPlugin module
 */
define(
  function () {

    return class KeyboardListenerPlugin {

      /**
       * Constructor
       */
      constructor(canvas, editorConfig) {
        this.canvas = canvas;
        this.editorConfig = editorConfig;
      }


      /**
       * Check if the configuration is valid
       *
       * @param pluginConfig
       *
       * @return boolean
       */
      configurationIsValid(pluginConfig) {
        // no additional configuration required
        return true;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.editorConfig.enable_delete_object === true) {
          document.addEventListener("keydown", (event) => {
            var keyId = event.keyCode;
            // backspace -> 8
            // delete    -> 46
            if (keyId === 46) {
              let element = this.canvas.getActiveObject();
              if (element) {
                element.remove();
              }
            }
          });
        }
      }

      
    }

  }
);
