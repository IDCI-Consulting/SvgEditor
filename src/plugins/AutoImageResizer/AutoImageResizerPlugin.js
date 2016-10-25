/**
 * AutoImageResizerPlugin module
 */
define(
  function () {

    return class AutoImageResizerPlugin {

      /**
       * Constructor
       */
      constructor(canvas, config) {
        this.config = config;
        this.canvas = canvas;
      }

      /**
       * Get the configuration errors
       *
       * @return array
       */
      getConfigurationErrors() {
        let errors = [];

        if (typeof this.config.auto_image_resizer === 'undefined') {
          errors.push('auto_image_resizer must be defined');
        } else {
          if (typeof this.config.auto_image_resizer.enable !== 'boolean') {
            errors.push('auto_image_resizer.enable must be defined as a boolean');
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {

      }
    }
  }
);
