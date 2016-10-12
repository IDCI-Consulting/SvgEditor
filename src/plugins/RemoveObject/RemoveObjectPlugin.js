/**
 * OutputAreaPlugin module
 */
define(
  function () {

    return class RemoveObjectPlugin {

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

        if (typeof this.config.remove_object === 'undefined') {
          errors.push('remove_object must be defined');
        } else {
          if (typeof this.config.remove_object.enable !== 'boolean') {
            errors.push('remove_object.enable must be defined as a boolean');
          } else {
            if (this.config.remove_object.enable === true) {
              if (typeof this.config.remove_object.input_id !== 'string') {
                errors.push('remove_object.input_id must be defined (as a string) because the plugin is enabled');
              } else {
                if (document.getElementById(this.config.remove_object.input_id) === null) {
                  errors.push('No tag with id ' + this.config.remove_object.input_id + ' found');
                } else {
                  this.removeObjectButton = document.getElementById(this.config.remove_object.input_id);
                }
              }

            }
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.config.remove_object.enable === true) {
          this.removeObjectButton.onclick = () => {
            let element = this.canvas.getActiveObject();
            if (element) {
              element.remove();
            }
          }
        }
      }
    }

  }
);
