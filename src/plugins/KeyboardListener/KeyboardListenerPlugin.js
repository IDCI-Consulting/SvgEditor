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

          if (typeof this.config.keyboard_listener.enable_move_object !== 'boolean') {
            errors.push('keyboard_listener.enable_move_object must be defined as a boolean');
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        document.addEventListener("keydown", (event) => {

          if (this.config.keyboard_listener.enable_delete_object === true) {
            let keyId = event.keyCode;
            // backspace -> 8
            // delete    -> 46
            if (keyId === 46) {
              let element = this.canvas.getActiveObject();
              if (element) {
                element.remove();
              }
            }
          }

          if (this.config.keyboard_listener.enable_move_object === true) {
            let activeObject = this.canvas.getActiveObject();
            if (typeof activeObject !== 'undefined') {
              let arrowKeys = [37, 38, 39, 40];
              let keyId = event.keyCode;
              if (arrowKeys.indexOf(keyId) !== -1) {
                event.preventDefault();
                let newLeft = activeObject.left;
                let newTop = activeObject.top;
                switch(keyId) {
                  case 37: // left arrow
                    newLeft = newLeft - 5;
                    activeObject.set({left: newLeft});
                    this.canvas.renderAll();
                    break;
                  case 38: // up arrow
                    newTop = newTop - 5;
                    activeObject.set({top: newTop});
                    this.canvas.renderAll();
                    break;
                  case 39: // right arrow
                    newLeft = newLeft + 5;
                    activeObject.set({left: newLeft});
                    this.canvas.renderAll();
                    break;
                  case 40: // down arrow
                    newTop = newTop + 5;
                    activeObject.set({top: newTop});
                    this.canvas.renderAll();
                }
              }
            }
          }

        });
      }
    }
  }
);
