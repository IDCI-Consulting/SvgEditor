/**
 * OutputAreaPlugin module
 */
define(
  function () {

    return class OutputAreaPlugin {

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

        if (
          typeof this.config.output_area === 'undefined' ||
          typeof this.config.output_area.enable !== 'boolean'
        ) {
          errors.push('output_area.enable must be defined');
        }

        if (this.config.output_area.enable === true) {
          if (typeof this.config.output_area.texarea_id !== 'string') {
            errors.push('output_area.texarea_id must be defined because the plugin is enabled');
          } else {
            this.outputArea = document.getElementById(this.config.output_area.texarea_id);
            if (this.outputArea === null) {
              errors.push('No tag with id '+ this.config.output_area.texarea_id +' found');
            }
          }
        }

        return errors;
      }

      /**
       * Start the plugin
       */
      start() {
        if (this.config.output_area.enable === true) {
          this.canvas.on('after:render', () => {
            this.fillOutput();
          });

          this.fillOutput();

          if (true !== this.config.enable_textarea_edition) {
            this.outputArea.readOnly = true;
          }

          this.startOutputAreaListener();
        }
      }

      /**
       * Fill the output area with the canvas exported in svg
       */
      fillOutput() {
        this.outputArea.value = this.canvas.toSVG();
      }

      /**
       * Start a listener to fill the output area when the canvas is edited
       */
      startOutputAreaListener() {
        if (this.outputArea.addEventListener) {
          this.outputArea.addEventListener('input', (event) => {
            fabric.loadSVGFromString(event.target.value, (objects, options) => {
              this.canvas.off('after:render');
              this.canvas.clear();
              let object = fabric.util.groupSVGElements(objects, options);
              this.canvas.add(object);
              this.canvas.on('after:render', () => { this.fillOutput() });
            });
          }, false);
        } else if (this.outputArea.attachEvent) {
          this.outputArea.attachEvent('onpropertychange', () => {
            // IE-specific event handling code
          });
        }
      }
    }

  }
);
