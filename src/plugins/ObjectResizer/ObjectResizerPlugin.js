/**
 * ObjectResizerPlugin module
 */
define(
  function () {
    return class ObjectResizerPlugin {

      /**
       * Constructor
       */
      constructor(canvas, config) {
        this.canvas = canvas;
        this.config = config;
      }

      /**
       * Check if the configuration is valid
       *
       * @return array
       */
      getConfigurationErrors() {
        let errors = [];

        if (typeof this.config.object_resizer === 'undefined') {
          errors.push('object_resizer must be defined');
        } else {
          if (typeof this.config.object_resizer.enable !== 'boolean') {
            errors.push('object_resizer.enable must be defined as a boolean');
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.config.object_resizer.enable === true) {
          this.canvas.on('canvas:deserialized', (event) => {
            if (event.ratio) {
              let objects = this.canvas.getObjects();
              for (var i = 0; i < objects.length; i++) {
                let object = objects[i];
                object.scaleX = event.ratio * object.scaleX;
                object.scaleY = event.ratio * object.scaleY;
                object.top = event.ratio * object.top;
                object.left = event.ratio * object.left;
                object.setCoords();
              }
            }
          });
        }
      }
    }
  }
);
