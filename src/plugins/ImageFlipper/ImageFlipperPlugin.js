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
       * @param config : a configuration object
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

        if (
          typeof this.config.image_flipper === 'undefined'
        ) {
          errors.push('image_flipper must be defined');
        } else {

          if (typeof this.config.image_flipper.enable_horizontal_flip !== 'boolean') {
            errors.push('image_flipper.enable_horizontal_flip must be defined as a boolean');
          } else {
            if (this.config.image_flipper.enable_horizontal_flip === true) {
              if (typeof this.config.image_flipper.horizontal_flip_input_id !== 'string') {
                errors.push('image_flipper.horizontal_flip_input_id must be defined (as a string) because the enable_horizontal_flip parameter is set to true');
              } else {
                this.horizontalInput = document.getElementById(this.config.image_flipper.horizontal_flip_input_id);
                if (this.horizontalInput === null) {
                  errors.push('No tag with id ' + this.config.image_flipper.horizontal_flip_input_id + ' found');
                }
              }
            }
          }

          if (typeof this.config.image_flipper.enable_vertical_flip !== 'boolean') {
            errors.push('image_flipper.enable_vertical_flip must be defined as a boolean');
          } else {
            if (this.config.image_flipper.enable_vertical_flip === true) {
              if (typeof this.config.image_flipper.vertical_flip_input_id !== 'string') {
                errors.push('image_flipper.vertical_flip_input_id must be defined (as a string) because the enable_vertical_flip parameter is set to true');
              } else {
                this.verticalInput = document.getElementById(this.config.image_flipper.vertical_flip_input_id);
                if (this.verticalInput === null) {
                  errors.push('No tag with id '+ this.config.image_flipper.vertical_flip_input_id +' found');
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
        if (this.config.image_flipper.enable_horizontal_flip === true) {
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
        }

        if (this.config.image_flipper.enable_vertical_flip === true) {
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
  }
);

