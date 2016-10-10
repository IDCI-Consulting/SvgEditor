/**
 * KeyboardListenerPlugin module
 */
define(
  function () {

    return class KeyboardListenerPlugin {

      /**
       * Constructor
       */
      constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;
      }


      /**
       * Get the configuration errors
       *
       * @return array
       */
      getConfigurationErrors() {
        let errors = [];
        if (typeof this.config.keyboard_listener === 'undefined') {
          errors.push('keyboard_listener must be defined');
        } else {
          if (typeof this.config.keyboard_listener.enable_delete_object !== 'boolean') {
            errors.push('keyboard_listener.enable_delete_object must be defined as a boolean');
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.config.keyboard_listener.enable_delete_object === true) {
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
