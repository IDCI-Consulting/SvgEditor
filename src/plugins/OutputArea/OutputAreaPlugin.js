/**
 * OutputAreaPlugin module
 */
define(
  function () {

    return class OutputAreaPlugin {

      /**
       * Constructor
       */
      constructor(canvas, editorConfig, pluginConfig) {

        this.outputArea   = document.getElementById(pluginConfig.elementId);
        this.canvas       = canvas;
        this.editorConfig = editorConfig;
      }

      /**
       * Start the plugin
       */
      start() {

        this.canvas.on('after:render', () => {
          this.fillOutput();
        });

          this.fillOutput();

        if (true !== this.editorConfig.display_textarea) {
          this.outputArea.style.display = "none";
        }

        if (true !== this.editorConfig.enable_textarea_edition) {
          this.outputArea.readOnly = true;
        }

        this.startOutputAreaListener();
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
