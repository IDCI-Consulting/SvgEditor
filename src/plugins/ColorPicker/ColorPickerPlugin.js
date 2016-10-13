/**
 * ColorPickerPlugin module
 */
define(
  [
    './SvgColorator'
  ],
  function (SvgColorator) {

    return class ColorPickerPlugin {

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

        if (typeof this.config.color_picker === 'undefined') {
          errors.push('color_picker must be defined');
        } else {
          if (typeof this.config.color_picker.enable !== 'boolean') {
            errors.push('color_picker.enable must be defined as a boolean');
          } else {
            if (this.config.color_picker.enable === true) {
              if (typeof this.config.color_picker.input_id !== 'string') {
                errors.push('color_picker.input_id must be defined (as a string) because the plugin is enabled');
              } else {
                if (document.getElementById(this.config.color_picker.input_id) === null) {
                  errors.push('No tag with id ' + this.config.color_picker.input_id + ' found');
                } else {

                  this.colorPicker = document.getElementById(this.config.color_picker.input_id);
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
        if (this.config.color_picker.enable === true) {
          this.colorPicker.onchange = (e) => {
            let element = this.canvas.getActiveObject();
            if (element) {
              let color = '#' + e.target.value;
              SvgColorator.color(element, color);
              this.canvas.renderAll();
            }
          };

          this.canvas.on('object:selected', (event) => {
            let object = event.target;
            let color = SvgColorator.getColor(object);
            if (color !== null) {
              if (color.type === 'hexa') {
                this.colorPicker.jscolor.fromString(color.value);
              } else if (color.type === 'rgb') {
                this.colorPicker.jscolor.fromRGB(color.r, color.g, color.b);
              }
            }
          });
        }
      }
    }
  }
);
