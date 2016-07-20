/**
 * SvgEditor module
 */
define(function () {

  return class SvgEditor {

    /**
     * Constructor
     */
    constructor(canvas, outputArea, config) {
      this.outputArea = outputArea;
      this.canvas = canvas;

      if (true !== config.enable_textarea) {
        outputArea.readOnly = true;
      }
    }

    /**
     * Get the canvas
     *
     * @return canvas
     */
    getCanvas() {
      return this.canvas;
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
            var object = fabric.util.groupSVGElements(objects, options);
            this.canvas.add(object);
            this.canvas.renderAll();
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

});
