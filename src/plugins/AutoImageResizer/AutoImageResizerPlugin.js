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
        if (this.config.auto_image_resizer.enable === true) {
          this.canvas.on('object:added', (event) => {
            let object = event.target;
            let canvasWidth = parseInt(getComputedStyle(document.getElementById(this.config.canvas_id)).width);
            let canvasHeight = parseInt(getComputedStyle(document.getElementById(this.config.canvas_id)).height);

            if (object.width * object.scaleX > canvasWidth) { // the object is too large for the canvas so we resize it automatically
              let ratio = canvasWidth/object.width*0.90/object.scaleX;
              object.scaleX = ratio * object.scaleX;
              object.scaleY = ratio * object.scaleY;
              this.canvas.centerObject(object);
              object.setCoords();
            }

            if (object.height * object.scaleY > canvasHeight) { // the object is too large for the canvas so we resize it automatically
              let ratio = canvasHeight/object.height*0.90/object.scaleX;
              object.scaleX = ratio * object.scaleX;
              object.scaleY = ratio * object.scaleY;
              this.canvas.centerObject(object);
              object.setCoords();
            }
          });
        }
      }
    }
  }
);
