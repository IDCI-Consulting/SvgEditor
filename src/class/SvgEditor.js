/**
 * SvgEditor module
 */
define(['./ImageReader/ImageReaderRegistry'], function (ImageReaderRegistry) {

  return class SvgEditor {

    /**
     * Constructor
     */
    constructor(canvas, outputArea, imageInput, config) {
      this.outputArea = outputArea;
      this.canvas = canvas;
      this.imageInput = imageInput;

      if (true !== config.display_textarea) {
        outputArea.style.display = "none";
      }

      if (true !== config.enable_textarea_edition) {
        outputArea.readOnly = true;
      }
    }

    /**
     * Initialize the editor
     */
    init() {
      this.canvas.on('after:render', () => { this.fillOutput() });
      this.startOutputAreaListener();
      this.startImageLoader();
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

    /**
     * Start an image loader
     */
    startImageLoader() {
      this.imageInput.onchange = (e) => {
        let file = e.target.files[0];
        let imageReaderRegistry = new ImageReaderRegistry();
        let imageReader = imageReaderRegistry.guessImageReader(file.type);
        let item = imageReader.getCanvasImage(file, (item) => {
          this.canvas.centerObject(item);
          this.canvas.add(item);
          this.canvas.renderAll(); 
        });
      }
    }

  }

});
