/**
 * KeyboardListenerPlugin module
 */
define(
  function () {

    return class KeyboardListenerPlugin {

      /**
       * Constructor
       */
      constructor(canvas) {
        this.canvas = canvas;
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
);
